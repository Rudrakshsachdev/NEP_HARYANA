from django.urls import path

from .views import (
    CollegeListView,
    LoginView,
    MeView,
    NominationHeaderDetailView,
    NominationHeaderOpenView,
    NominationHeaderSubmissionView,
    PasswordResetConfirmView,
    PasswordResetRequestView,
    RegisterView,
)

urlpatterns = [
    path('colleges/', CollegeListView.as_view(), name='college-list'),
    path('auth/register/', RegisterView.as_view(), name='auth-register'),
    path('auth/login/', LoginView.as_view(), name='auth-login'),
    path('auth/me/', MeView.as_view(), name='auth-me'),
    path('nomination-header/', NominationHeaderSubmissionView.as_view(), name='nomination-header'),
    path('nomination-header/open/', NominationHeaderOpenView.as_view(), name='nomination-header-open'),
    path('nomination-header/<uuid:form_id>/', NominationHeaderDetailView.as_view(), name='nomination-header-detail'),
    path('auth/password-reset/', PasswordResetRequestView.as_view(), name='auth-password-reset'),
    path('auth/password-reset-confirm/', PasswordResetConfirmView.as_view(), name='auth-password-reset-confirm'),
]