from rest_framework import serializers
from .models import NominationHeader

class NominationHeaderSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(source='form_id', read_only=True)

    class Meta:
        model = NominationHeader
        fields = [
            'id', 
            'institution_name', 
            'aishe_code', 
            'institution_type',
            'establishment_year',
            'affiliating_university',
            'head_name', 
            'head_contact', 
            'institution_email',
            'institution_phone',
            'hei_address', 
            'website_url',
            'nodal_name',
            'nodal_contact',
            'nodal_email',
            'ugc_status',
            'accreditation_status',
            'naac_grade',
            'naac_cgpa',
            'total_students',
            'total_faculty',
            'academic_session', 
            'is_submitted',
            'created_at', 
            'updated_at'
        ]
        read_only_fields = ['id', 'academic_session', 'created_at', 'updated_at']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and request.user:
            validated_data['user'] = request.user
        return super().create(validated_data)
