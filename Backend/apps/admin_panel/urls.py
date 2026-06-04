from django.urls import path

from .views import (
    AdminAnalyticsView,
    AdminApplicationsView,
    AdminDashboardStatsView,
    AdminInstitutionsView,
    AdminNominationReviewView,
)

urlpatterns = [
    path("admin/dashboard/stats/", AdminDashboardStatsView.as_view(), name="admin-dashboard-stats"),
    path("admin/applications/", AdminApplicationsView.as_view(), name="admin-applications"),
    path("admin/institutions/", AdminInstitutionsView.as_view(), name="admin-institutions"),
    path("admin/analytics/", AdminAnalyticsView.as_view(), name="admin-analytics"),
    path("admin/nominations/<int:college_id>/review/", AdminNominationReviewView.as_view(), name="admin-nomination-review"),
]
