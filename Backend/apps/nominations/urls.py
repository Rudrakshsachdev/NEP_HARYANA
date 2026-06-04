from django.urls import path
from .views import (
    NominationConfigView,
    NominationListView,
    NominationDetailView,
    NominationSaveView,
    NominationSubmitView,
    MySubmissionsListView
)

urlpatterns = [
    path('config/', NominationConfigView.as_view(), name='nomination-config'),
    path('my-submissions/', MySubmissionsListView.as_view(), name='my-submissions-list'),
    path('', NominationListView.as_view(), name='nomination-list'),
    path('<str:form_id>/', NominationDetailView.as_view(), name='nomination-detail'),
    path('<str:form_id>/save/', NominationSaveView.as_view(), name='nomination-save'),
    path('<str:form_id>/submit/', NominationSubmitView.as_view(), name='nomination-submit'),
]
