import uuid
from django.db import models
from django.conf import settings

class NominationHeader(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='nomination_header')
    form_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    is_submitted = models.BooleanField(default=False)
    
    # Basic Profile
    institution_name = models.CharField(max_length=255)
    aishe_code = models.CharField(max_length=50)
    institution_type = models.CharField(max_length=50, default='college')
    establishment_year = models.IntegerField(null=True, blank=True)
    affiliating_university = models.CharField(max_length=255, blank=True)
    
    # Contact Details
    head_name = models.CharField(max_length=255)
    head_contact = models.CharField(max_length=255, blank=True)
    institution_email = models.EmailField(blank=True)
    institution_phone = models.CharField(max_length=100, blank=True)
    hei_address = models.TextField(blank=True)
    website_url = models.URLField(blank=True)
    
    # Nodal Officer Details
    nodal_name = models.CharField(max_length=255, blank=True)
    nodal_contact = models.CharField(max_length=100, blank=True)
    nodal_email = models.EmailField(blank=True)
    
    # Regulatory Status
    ugc_status = models.CharField(max_length=50, default='none')
    accreditation_status = models.CharField(max_length=50, default='not_accredited')
    naac_grade = models.CharField(max_length=50, blank=True)
    naac_cgpa = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    
    # Student & Faculty Capacity
    total_students = models.IntegerField(null=True, blank=True)
    total_faculty = models.IntegerField(null=True, blank=True)
    
    academic_session = models.CharField(max_length=20, default='2024-25')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Nomination Header - {self.institution_name} ({self.academic_session})"
