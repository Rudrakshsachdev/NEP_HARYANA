from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import ScoringInputSerializer, ScoringResultSerializer
from .engine import NEPScoringEngine
from apps.forms.models import NominationHeader

class ScoringCalculateView(APIView):
    """
    API endpoint to trigger scoring engine computations for NEP Excellence Awards.
    Method: POST
    Permission: AllowAny (for flexible testing and integration)
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ScoringInputSerializer(data=request.data)
        if serializer.is_valid():
            results = NEPScoringEngine.calculate_scores(serializer.validated_data)
            output_serializer = ScoringResultSerializer(results)
            return Response(output_serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NominationScoreView(APIView):
    """
    API endpoint to fetch the current institution's live score and status.
    Method: GET
    Permission: IsAuthenticated
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        header = NominationHeader.objects.filter(user=request.user).first()
        if not header:
            return Response({
                'is_started': False,
                'is_submitted': False,
                'scoring': None,
                'header': None
            }, status=status.HTTP_200_OK)

        entries = header.indicators.all()
        inputs = self.map_database_to_scoring_inputs(header, entries)
        results = NEPScoringEngine.calculate_scores(inputs)

        return Response({
            'is_started': True,
            'is_submitted': header.is_submitted,
            'scoring': results,
            'header': {
                'institution_name': header.institution_name,
                'aishe_code': header.aishe_code,
                'academic_session': header.academic_session,
                'updated_at': header.updated_at
            }
        }, status=status.HTTP_200_OK)

    def map_database_to_scoring_inputs(self, nomination, entries):
        entries_map = {entry.indicator_number: entry for entry in entries}
        
        def get_status(num):
            return entries_map.get(num).status if num in entries_map else False
            
        def get_ref_value(num):
            return entries_map.get(num).data_ref_value if num in entries_map else ""

        def extract_float(text, default=0.0):
            if not text:
                return default
            import re
            match = re.search(r'([0-9]*\.[0-9]+|[0-9]+)', text)
            if match:
                return float(match.group(1))
            return default

        def extract_int(text, default=0):
            if not text:
                return default
            import re
            match = re.search(r'\d+', text)
            if match:
                return int(match.group(1))
            return default

        inputs = {}

        # 1. Internship/Apprenticeship (Max 4) -> Frontend Ind 2
        if get_status(2):
            inputs['indicator_1'] = extract_float(get_ref_value(2), 100.0)
        else:
            inputs['indicator_1'] = 0.0

        # 2. Courses Offered in Indian Languages (Max 4) -> Frontend Ind 3
        if get_status(3):
            val = get_ref_value(3)
            count = extract_int(val, 0)
            if count >= 4: inputs['indicator_2'] = 80.0
            elif count == 3: inputs['indicator_2'] = 60.0
            elif count == 2: inputs['indicator_2'] = 30.0
            else: inputs['indicator_2'] = 10.0
        else:
            inputs['indicator_2'] = 0.0

        # 3. Special Programmes in IKS (Max 4) -> Frontend Ind 4
        if get_status(4):
            val = get_ref_value(4)
            count = extract_int(val, 0)
            if count >= 4: inputs['indicator_3'] = 95.0
            elif count == 3: inputs['indicator_3'] = 85.0
            elif count == 2: inputs['indicator_3'] = 75.0
            else: inputs['indicator_3'] = 55.0
        else:
            inputs['indicator_3'] = 0.0

        # 4. IDP Targets Achieved (Max 6) -> Frontend Ind 5
        if get_status(5):
            inputs['indicator_4'] = {'part_a_pct': 95.0, 'part_b_pct': 80.0}
        else:
            inputs['indicator_4'] = {'part_a_pct': 0.0, 'part_b_pct': 0.0}

        # 5. NAAC Accreditation Status (Max 8) -> Frontend Ind 7
        if get_status(7):
            grade = get_ref_value(7)
            if grade == "B++": grade = "B+"
            elif grade == "B/C": grade = "B"
            inputs['indicator_5'] = grade
        else:
            inputs['indicator_5'] = ""

        # 6. Academic Bank of Credits (ABC) Registered (Max 6) -> Frontend Ind 9
        if get_status(9):
            val = get_ref_value(9)
            if ">75" in val:
                inputs['indicator_6'] = {'abc_registered': True, 'percentage': 95.0}
            elif "<75" in val:
                inputs['indicator_6'] = {'abc_registered': True, 'percentage': 75.0}
            elif "<50" in val:
                inputs['indicator_6'] = {'abc_registered': True, 'percentage': 55.0}
            elif "<25" in val:
                inputs['indicator_6'] = {'abc_registered': True, 'percentage': 25.0}
            else:
                inputs['indicator_6'] = {'abc_registered': False, 'percentage': 0.0}
        else:
            inputs['indicator_6'] = {'abc_registered': False, 'percentage': 0.0}

        # 7. Professor of Practice (PoP) Appointed (Max 4) -> Frontend Ind 11
        if get_status(11):
            inputs['indicator_7'] = extract_int(get_ref_value(11), 0)
        else:
            inputs['indicator_7'] = 0

        # 8. Incubation/Startup Cell Performance (Max 4) -> Frontend Ind 12
        if get_status(12):
            val = get_ref_value(12)
            if ">10" in val:
                inputs['indicator_8'] = {'startups_registered': 12, 'monetised_pct': 50.0}
            elif "6-10" in val:
                inputs['indicator_8'] = {'startups_registered': 8, 'monetised_pct': 50.0}
            elif "1-5" in val:
                inputs['indicator_8'] = {'startups_registered': 3, 'monetised_pct': 50.0}
            else:
                inputs['indicator_8'] = {'startups_registered': 0, 'monetised_pct': 0.0}
        else:
            inputs['indicator_8'] = {'startups_registered': 0, 'monetised_pct': 0.0}

        # 9. Academic/Research Collaboration with Foreign HEIs (Max 6) -> Frontend Ind 14
        if get_status(14):
            count = extract_int(get_ref_value(14), 0)
            inputs['indicator_9'] = {'activities_count': count, 'mou_signed': True}
        else:
            inputs['indicator_9'] = {'activities_count': 0, 'mou_signed': False}

        # 10. Alumni Connect Cell Functional (Max 4) -> Frontend Ind 15
        if get_status(15):
            count = extract_int(get_ref_value(15), 0)
            inputs['indicator_10'] = {
                'annual_report': count >= 1,
                'database': count >= 2,
                'reunion_event': count >= 3,
                'industry_alumni_invited': count >= 4
            }
        else:
            inputs['indicator_10'] = {
                'annual_report': False, 'database': False, 'reunion_event': False, 'industry_alumni_invited': False
            }

        # 11. Gender Parity Initiatives (Max 5) -> Frontend Ind 16
        if get_status(16):
            count = extract_int(get_ref_value(16), 0)
            inputs['indicator_11'] = {
                'icc_women_cell_displayed': count >= 1,
                'gender_billboards': count >= 2,
                'gender_champion_saksham': count >= 3,
                'saksham_gender_audit': count >= 4,
                'gender_workshop': count >= 5
            }
        else:
            inputs['indicator_11'] = {
                'icc_women_cell_displayed': False, 'gender_billboards': False, 'gender_champion_saksham': False, 'saksham_gender_audit': False, 'gender_workshop': False
            }

        # 12. UGC Physical Fitness, Sports & Student Wellbeing (Max 5) -> Frontend Ind 17 & 18
        status_17 = get_status(17)
        status_18 = get_status(18)
        count_18 = extract_int(get_ref_value(18), 0)
        inputs['indicator_12'] = {
            'mhwbc_established': status_17,
            'student_mh_workshops': count_18,
            'faculty_mh_workshop': status_17,
            'activity_calendar': status_18
        }

        # 13. Online Courses / MOOCs Adoption (Max 4) -> Frontend Ind 19
        if get_status(19):
            inputs['indicator_13'] = 80.0
        else:
            inputs['indicator_13'] = 0.0

        # 14. Teachers Trained under MMTTC (Max 4) -> Frontend Ind 20
        if get_status(20):
            val = get_ref_value(20)
            if ">75" in val: inputs['indicator_14'] = 85.0
            elif "<75" in val: inputs['indicator_14'] = 65.0
            elif "<50" in val: inputs['indicator_14'] = 45.0
            else: inputs['indicator_14'] = 0.0
        else:
            inputs['indicator_14'] = 0.0

        # Proposed Parameters
        # 15: Multidisciplinary Education (Max 8) -> Frontend Ind 8 (NCrF)
        if get_status(8):
            inputs['indicator_15'] = {
                'multidisciplinary_pct': 95.0, 'physical_aec': True, 'entrepreneurship_prog': True, 'industry_vac_sec': True
            }
        else:
            inputs['indicator_15'] = {
                'multidisciplinary_pct': 0.0, 'physical_aec': False, 'entrepreneurship_prog': False, 'industry_vac_sec': False
            }

        # 16: Multiple Entry-Exit (Max 2) -> Frontend Ind 1 (pursuit of two programmes simultaneously)
        if get_status(1):
            inputs['indicator_16'] = 15
        else:
            inputs['indicator_16'] = 0

        # 17: Research Outcome/Patents (Max 4) -> Frontend Ind 13 (Startup Policy)
        if get_status(13):
            inputs['indicator_17'] = {'patents_filed': 5, 'patents_granted': 2}
        else:
            inputs['indicator_17'] = {'patents_filed': 0, 'patents_granted': 0}

        # 18: NIRF (Max 2) -> Frontend Ind 6 (Ombudsperson)
        if get_status(6):
            inputs['indicator_18'] = {'nirf_registered_2026': True, 'nirf_top100_2025': True}
        else:
            inputs['indicator_18'] = {'nirf_registered_2026': False, 'nirf_top100_2025': False}

        # 19: OBE Implementation (Max 6) -> Frontend Ind 10 (AISHE update)
        if get_status(10):
            inputs['indicator_19'] = 95.0
        else:
            inputs['indicator_19'] = 0.0

        # 20: Utilization of Funds (Max 2) -> based on establishment year presence
        if nomination.establishment_year:
            inputs['indicator_20'] = 95.0
        else:
            inputs['indicator_20'] = 0.0

        # 21: Research Enrollment (PhD Scholars) (Max 4) -> total students presence
        if nomination.total_students and nomination.total_students > 0:
            inputs['indicator_21'] = 95.0
        else:
            inputs['indicator_21'] = 0.0

        # 22: RPL Adoption & Implementation (Max 4) -> NCrF presence
        if get_status(8):
            inputs['indicator_22'] = {'rpl_guidelines_adopted': True, 'rpl_programmes_pct': 60.0}
        else:
            inputs['indicator_22'] = {'rpl_guidelines_adopted': False, 'rpl_programmes_pct': 0.0}

        return inputs

