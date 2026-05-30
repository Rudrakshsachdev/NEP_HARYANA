class NEPScoringEngine:
    @staticmethod
    def calculate_scores(inputs):
        """
        Calculates scores for all 22 indicators of the NEP Excellence Awards.
        Inputs: dict containing indicator parameters.
        Returns: dict containing individual scores, category totals, and the award category.
        """
        scores = {}
        
        # Helper to convert to float safely
        def to_float(val, default=0.0):
            if val is None:
                return default
            try:
                return float(val)
            except (ValueError, TypeError):
                return default

        # Helper to convert to int safely
        def to_int(val, default=0):
            if val is None:
                return default
            try:
                return int(val)
            except (ValueError, TypeError):
                return default

        # Helper to get boolean safely
        def to_bool(val):
            return bool(val)

        # ==========================================
        # EXISTING PARAMETERS (Indicators 1–14)
        # ==========================================

        # INDICATOR 1: Internship/Apprenticeship Embedded Degree Programmes (Max: 4)
        ind1_pct = to_float(inputs.get('indicator_1'))
        if ind1_pct > 90.0:
            scores['indicator_1'] = 4
        elif ind1_pct > 80.0:
            scores['indicator_1'] = 3
        elif ind1_pct > 70.0:
            scores['indicator_1'] = 2
        elif ind1_pct > 50.0:
            scores['indicator_1'] = 1
        else:
            scores['indicator_1'] = 0

        # INDICATOR 2: Courses Offered in Indian Languages (Max: 4)
        ind2_pct = to_float(inputs.get('indicator_2'))
        if ind2_pct is None or ind2_pct == 0.0:
            scores['indicator_2'] = 0
        elif ind2_pct > 75.0:
            scores['indicator_2'] = 4
        elif ind2_pct > 50.0:
            scores['indicator_2'] = 3
        elif ind2_pct > 25.0:
            scores['indicator_2'] = 2
        else:
            scores['indicator_2'] = 1

        # INDICATOR 3: Special Programmes in IKS (Max: 4)
        ind3_pct = to_float(inputs.get('indicator_3'))
        if ind3_pct > 90.0:
            scores['indicator_3'] = 4
        elif ind3_pct > 80.0:
            scores['indicator_3'] = 3
        elif ind3_pct > 70.0:
            scores['indicator_3'] = 2
        elif ind3_pct > 50.0:
            scores['indicator_3'] = 1
        else:
            scores['indicator_3'] = 0

        # INDICATOR 4: IDP Targets Achieved (Max: 6)
        ind4_data = inputs.get('indicator_4') or {}
        part_a_pct = to_float(ind4_data.get('part_a_pct')) if isinstance(ind4_data, dict) else 0.0
        part_b_pct = to_float(ind4_data.get('part_b_pct')) if isinstance(ind4_data, dict) else 0.0

        score_4_a = 0
        if part_a_pct > 90.0:
            score_4_a = 3
        elif part_a_pct > 75.0:
            score_4_a = 2
        elif part_a_pct > 50.0:
            score_4_a = 1

        score_4_b = 0
        if part_b_pct > 75.0:
            score_4_b = 3
        elif part_b_pct > 50.0:
            score_4_b = 2
        elif part_b_pct > 25.0:
            score_4_b = 1

        scores['indicator_4'] = score_4_a + score_4_b

        # INDICATOR 5: NAAC Accreditation Status (Max: 8)
        grade = str(inputs.get('indicator_5') or '').strip()
        if grade == "A++":
            scores['indicator_5'] = 8
        elif grade == "A+":
            scores['indicator_5'] = 6
        elif grade == "A":
            scores['indicator_5'] = 4
        elif grade == "B+":
            scores['indicator_5'] = 3
        elif grade in ["B", "C"]:
            scores['indicator_5'] = 2
        elif grade == "Applied":
            scores['indicator_5'] = 1
        else:
            scores['indicator_5'] = 0

        # INDICATOR 6: Academic Bank of Credits (ABC) Registered (Max: 6)
        ind6_data = inputs.get('indicator_6') or {}
        abc_registered = to_bool(ind6_data.get('abc_registered')) if isinstance(ind6_data, dict) else False
        abc_pct = to_float(ind6_data.get('percentage')) if isinstance(ind6_data, dict) else 0.0

        if not abc_registered:
            scores['indicator_6'] = 0
        elif abc_pct > 90.0:
            scores['indicator_6'] = 6
        elif abc_pct > 80.0:
            scores['indicator_6'] = 5
        elif abc_pct > 70.0:
            scores['indicator_6'] = 4
        elif abc_pct > 60.0:
            scores['indicator_6'] = 3
        elif abc_pct > 50.0:
            scores['indicator_6'] = 2
        else:
            scores['indicator_6'] = 1

        # INDICATOR 7: Professor of Practice (PoP) Appointed (Max: 4)
        pop_count = to_int(inputs.get('indicator_7'))
        scores['indicator_7'] = min(max(pop_count, 0), 4)

        # INDICATOR 8: Incubation/Startup Cell Performance (Max: 4)
        ind8_data = inputs.get('indicator_8') or {}
        startups = to_int(ind8_data.get('startups_registered')) if isinstance(ind8_data, dict) else 0
        monetised_pct = to_float(ind8_data.get('monetised_pct')) if isinstance(ind8_data, dict) else 0.0

        score_8_a = 0
        if startups > 10:
            score_8_a = 3
        elif startups >= 6:
            score_8_a = 2
        elif startups >= 1:
            score_8_a = 1

        score_8_b = 1 if monetised_pct >= 50.0 else 0
        scores['indicator_8'] = min(score_8_a + score_8_b, 4)

        # INDICATOR 9: Academic/Research Collaboration with Foreign HEIs (Max: 6)
        ind9_data = inputs.get('indicator_9') or {}
        collab_count = to_int(ind9_data.get('activities_count')) if isinstance(ind9_data, dict) else 0
        mou_signed = to_bool(ind9_data.get('mou_signed')) if isinstance(ind9_data, dict) else False

        score_9_a = min(max(collab_count, 0), 5)
        score_9_b = 1 if mou_signed else 0
        scores['indicator_9'] = min(score_9_a + score_9_b, 6)

        # INDICATOR 10: Alumni Connect Cell Functional (Max: 4)
        ind10_data = inputs.get('indicator_10') or {}
        ind10_keys = ['annual_report', 'database', 'reunion_event', 'industry_alumni_invited']
        scores['indicator_10'] = sum(1 for k in ind10_keys if to_bool(ind10_data.get(k))) if isinstance(ind10_data, dict) else 0

        # INDICATOR 11: Gender Parity Initiatives (Max: 5)
        ind11_data = inputs.get('indicator_11') or {}
        ind11_keys = ['icc_women_cell_displayed', 'gender_billboards', 'gender_champion_saksham', 'saksham_gender_audit', 'gender_workshop']
        scores['indicator_11'] = sum(1 for k in ind11_keys if to_bool(ind11_data.get(k))) if isinstance(ind11_data, dict) else 0

        # INDICATOR 12: UGC Physical Fitness, Sports & Student Wellbeing (Max: 5)
        ind12_data = inputs.get('indicator_12') or {}
        if isinstance(ind12_data, dict):
            mhwbc = 1 if to_bool(ind12_data.get('mhwbc_established')) else 0
            
            # min 2 workshops required
            workshops = ind12_data.get('student_mh_workshops')
            if isinstance(workshops, bool):
                student_mh = 1 if workshops else 0
            else:
                student_mh = 1 if to_int(workshops) >= 2 else 0
                
            faculty_mh = 1 if to_bool(ind12_data.get('faculty_mh_workshop')) else 0
            calendar = 2 if to_bool(ind12_data.get('activity_calendar')) else 0
            scores['indicator_12'] = mhwbc + student_mh + faculty_mh + calendar
        else:
            scores['indicator_12'] = 0

        # INDICATOR 13: Online Courses / MOOCs Adoption (Max: 4)
        ind13_pct = to_float(inputs.get('indicator_13'))
        if ind13_pct > 75.0:
            scores['indicator_13'] = 4
        elif ind13_pct > 50.0:
            scores['indicator_13'] = 3
        elif ind13_pct > 40.0:
            scores['indicator_13'] = 2
        elif ind13_pct > 25.0:
            scores['indicator_13'] = 1
        else:
            scores['indicator_13'] = 0

        # INDICATOR 14: Teachers Trained under MMTTC (NEP Orientation) (Max: 4)
        ind14_pct = to_float(inputs.get('indicator_14'))
        if ind14_pct > 80.0:
            scores['indicator_14'] = 4
        elif ind14_pct > 60.0:
            scores['indicator_14'] = 3
        elif ind14_pct > 40.0:
            scores['indicator_14'] = 2
        elif ind14_pct > 20.0:
            scores['indicator_14'] = 1
        else:
            scores['indicator_14'] = 0

        existing_total = min(sum(scores.get(f'indicator_{i}', 0) for i in range(1, 15)), 60)

        # ==========================================
        # PROPOSED / NEW PARAMETERS (Indicators 15–22)
        # ==========================================

        # INDICATOR 15: Multidisciplinary Education (Max: 8)
        ind15_data = inputs.get('indicator_15') or {}
        multi_pct = to_float(ind15_data.get('multidisciplinary_pct')) if isinstance(ind15_data, dict) else 0.0
        physical_aec = to_bool(ind15_data.get('physical_aec')) if isinstance(ind15_data, dict) else False
        entrepreneurship_prog = to_bool(ind15_data.get('entrepreneurship_prog')) if isinstance(ind15_data, dict) else False
        industry_vac_sec = to_bool(ind15_data.get('industry_vac_sec')) if isinstance(ind15_data, dict) else False

        score_15_a = 0
        if multi_pct > 90.0:
            score_15_a = 6
        elif multi_pct > 80.0:
            score_15_a = 5
        elif multi_pct > 70.0:
            score_15_a = 4
        elif multi_pct > 60.0:
            score_15_a = 3
        elif multi_pct > 50.0:
            score_15_a = 2
        elif multi_pct > 25.0:
            score_15_a = 1

        score_15_b = 1 if physical_aec else 0
        score_15_c = 1 if entrepreneurship_prog else 0
        score_15_d = 1 if industry_vac_sec else 0
        scores['indicator_15'] = min(score_15_a + score_15_b + score_15_c + score_15_d, 8)

        # INDICATOR 16: Multiple Entry-Exit Operationalised (Max: 2)
        entry_exit_count = to_int(inputs.get('indicator_16'))
        if entry_exit_count > 10:
            scores['indicator_16'] = 2
        elif entry_exit_count >= 1:
            scores['indicator_16'] = 1
        else:
            scores['indicator_16'] = 0

        # INDICATOR 17: Research Outcome: Patents Filed & Granted (Max: 4)
        ind17_data = inputs.get('indicator_17') or {}
        filed = to_int(ind17_data.get('patents_filed')) if isinstance(ind17_data, dict) else 0
        granted = to_int(ind17_data.get('patents_granted')) if isinstance(ind17_data, dict) else 0

        scores['indicator_17'] = min(filed // 2, 2) + min(granted, 2)

        # INDICATOR 18: Registration & Performance in NIRF (Max: 2)
        ind18_data = inputs.get('indicator_18') or {}
        nirf_registered = to_bool(ind18_data.get('nirf_registered_2026')) if isinstance(ind18_data, dict) else False
        nirf_top100 = to_bool(ind18_data.get('nirf_top100_2025')) if isinstance(ind18_data, dict) else False
        scores['indicator_18'] = (1 if nirf_registered else 0) + (1 if nirf_top100 else 0)

        # INDICATOR 19: Outcome-Based Education (OBE) Implementation (Max: 6)
        obe_pct = to_float(inputs.get('indicator_19'))
        if obe_pct > 90.0:
            scores['indicator_19'] = 6
        elif obe_pct > 80.0:
            scores['indicator_19'] = 5
        elif obe_pct > 70.0:
            scores['indicator_19'] = 4
        elif obe_pct > 60.0:
            scores['indicator_19'] = 3
        elif obe_pct > 50.0:
            scores['indicator_19'] = 2
        elif obe_pct > 25.0:
            scores['indicator_19'] = 1
        else:
            scores['indicator_19'] = 0

        # INDICATOR 20: Utilization of Funds (Max: 2)
        util_pct = to_float(inputs.get('indicator_20'))
        if util_pct > 90.0:
            scores['indicator_20'] = 2
        elif util_pct > 50.0:
            scores['indicator_20'] = 1
        else:
            scores['indicator_20'] = 0

        # INDICATOR 21: Research Enrollment (PhD Scholars) (Max: 4)
        phd_pct = to_float(inputs.get('indicator_21'))
        if phd_pct > 90.0:
            scores['indicator_21'] = 4
        elif phd_pct > 80.0:
            scores['indicator_21'] = 3
        elif phd_pct > 70.0:
            scores['indicator_21'] = 2
        elif phd_pct > 50.0:
            scores['indicator_21'] = 1
        else:
            scores['indicator_21'] = 0

        # INDICATOR 22: RPL Adoption & Implementation (Max: 4)
        ind22_data = inputs.get('indicator_22') or {}
        rpl_adopted = to_bool(ind22_data.get('rpl_guidelines_adopted')) if isinstance(ind22_data, dict) else False
        rpl_pct = to_float(ind22_data.get('rpl_programmes_pct')) if isinstance(ind22_data, dict) else 0.0

        score_22_a = 1 if rpl_adopted else 0
        score_22_b = 0
        if rpl_pct > 0.0:
            if rpl_pct > 50.0:
                score_22_b = 3
            elif rpl_pct > 25.0:
                score_22_b = 2
            else:
                score_22_b = 1

        scores['indicator_22'] = score_22_a + score_22_b

        proposed_total = sum(scores.get(f'indicator_{i}', 0) for i in range(15, 23))

        grand_total = existing_total + proposed_total
        percentage = (grand_total / 92.0) * 100.0

        # Determine award category
        if percentage > 90.0:
            award_category = "Platinum"
        elif percentage >= 75.0:
            award_category = "Gold"
        elif percentage > 50.0:
            award_category = "Silver"
        else:
            award_category = "No Award"

        return {
            'scores': scores,
            'existing_total': existing_total,
            'proposed_total': proposed_total,
            'grand_total': grand_total,
            'percentage': round(percentage, 2),
            'award_category': award_category
        }
