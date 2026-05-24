from rest_framework import serializers

# --- Nested Serializers for Compound Indicators ---

class Indicator4InputSerializer(serializers.Serializer):
    part_a_pct = serializers.FloatField(required=False, default=0.0)
    part_b_pct = serializers.FloatField(required=False, default=0.0)

class Indicator6InputSerializer(serializers.Serializer):
    abc_registered = serializers.BooleanField(required=False, default=False)
    percentage = serializers.FloatField(required=False, default=0.0)

class Indicator8InputSerializer(serializers.Serializer):
    startups_registered = serializers.IntegerField(required=False, default=0)
    monetised_pct = serializers.FloatField(required=False, default=0.0)

class Indicator9InputSerializer(serializers.Serializer):
    activities_count = serializers.IntegerField(required=False, default=0)
    mou_signed = serializers.BooleanField(required=False, default=False)

class Indicator10InputSerializer(serializers.Serializer):
    annual_report = serializers.BooleanField(required=False, default=False)
    database = serializers.BooleanField(required=False, default=False)
    reunion_event = serializers.BooleanField(required=False, default=False)
    industry_alumni_invited = serializers.BooleanField(required=False, default=False)

class Indicator11InputSerializer(serializers.Serializer):
    icc_women_cell_displayed = serializers.BooleanField(required=False, default=False)
    gender_billboards = serializers.BooleanField(required=False, default=False)
    gender_champion_saksham = serializers.BooleanField(required=False, default=False)
    saksham_gender_audit = serializers.BooleanField(required=False, default=False)
    gender_workshop = serializers.BooleanField(required=False, default=False)

class Indicator12InputSerializer(serializers.Serializer):
    mhwbc_established = serializers.BooleanField(required=False, default=False)
    # student_mh_workshops can be a count (integer) or boolean evaluated. We accept generic type.
    student_mh_workshops = serializers.JSONField(required=False, default=0)
    faculty_mh_workshop = serializers.BooleanField(required=False, default=False)
    activity_calendar = serializers.BooleanField(required=False, default=False)

class Indicator15InputSerializer(serializers.Serializer):
    multidisciplinary_pct = serializers.FloatField(required=False, default=0.0)
    physical_aec = serializers.BooleanField(required=False, default=False)
    entrepreneurship_prog = serializers.BooleanField(required=False, default=False)
    industry_vac_sec = serializers.BooleanField(required=False, default=False)

class Indicator17InputSerializer(serializers.Serializer):
    patents_filed = serializers.IntegerField(required=False, default=0)
    patents_granted = serializers.IntegerField(required=False, default=0)

class Indicator18InputSerializer(serializers.Serializer):
    nirf_registered_2026 = serializers.BooleanField(required=False, default=False)
    nirf_top100_2025 = serializers.BooleanField(required=False, default=False)

class Indicator22InputSerializer(serializers.Serializer):
    rpl_guidelines_adopted = serializers.BooleanField(required=False, default=False)
    rpl_programmes_pct = serializers.FloatField(required=False, default=0.0)


# --- Main Scoring Input Serializer ---

class ScoringInputSerializer(serializers.Serializer):
    indicator_1 = serializers.FloatField(required=False, default=0.0)
    indicator_2 = serializers.FloatField(required=False, default=0.0)
    indicator_3 = serializers.FloatField(required=False, default=0.0)
    indicator_4 = Indicator4InputSerializer(required=False, default=dict)
    indicator_5 = serializers.CharField(required=False, default="", allow_blank=True)
    indicator_6 = Indicator6InputSerializer(required=False, default=dict)
    indicator_7 = serializers.IntegerField(required=False, default=0)
    indicator_8 = Indicator8InputSerializer(required=False, default=dict)
    indicator_9 = Indicator9InputSerializer(required=False, default=dict)
    indicator_10 = Indicator10InputSerializer(required=False, default=dict)
    indicator_11 = Indicator11InputSerializer(required=False, default=dict)
    indicator_12 = Indicator12InputSerializer(required=False, default=dict)
    indicator_13 = serializers.FloatField(required=False, default=0.0)
    indicator_14 = serializers.FloatField(required=False, default=0.0)
    indicator_15 = Indicator15InputSerializer(required=False, default=dict)
    indicator_16 = serializers.IntegerField(required=False, default=0)
    indicator_17 = Indicator17InputSerializer(required=False, default=dict)
    indicator_18 = Indicator18InputSerializer(required=False, default=dict)
    indicator_19 = serializers.FloatField(required=False, default=0.0)
    indicator_20 = serializers.FloatField(required=False, default=0.0)
    indicator_21 = serializers.FloatField(required=False, default=0.0)
    indicator_22 = Indicator22InputSerializer(required=False, default=dict)


# --- Main Scoring Output Serializer ---

class ScoringResultSerializer(serializers.Serializer):
    scores = serializers.DictField(child=serializers.IntegerField())
    existing_total = serializers.IntegerField()
    proposed_total = serializers.IntegerField()
    grand_total = serializers.IntegerField()
    percentage = serializers.FloatField()
    award_category = serializers.CharField()
