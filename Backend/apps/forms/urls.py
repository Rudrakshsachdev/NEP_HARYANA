from django.urls import path
from .views import (
    NominationHeaderView,
    NominationHeaderOpenView,
    NominationHeaderDetailView
)

urlpatterns = [
    path('nomination-header/', NominationHeaderView.as_view(), name='nomination-header-get'),
    path('nomination-header/open/', NominationHeaderOpenView.as_view(), name='nomination-header-open'),
    path('nomination-header/<str:form_id>/', NominationHeaderDetailView.as_view(), name='nomination-header-detail'),
]
