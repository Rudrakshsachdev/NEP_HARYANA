from django.urls import path

from .views import (
    AdminAnalyticsView,
    AdminApplicationsView,
    AdminDashboardStatsView,
    AdminInstitutionsView,
)

urlpatterns = [
    path("admin/dashboard/stats/", AdminDashboardStatsView.as_view(), name="admin-dashboard-stats"),
    path("admin/applications/", AdminApplicationsView.as_view(), name="admin-applications"),
    path("admin/institutions/", AdminInstitutionsView.as_view(), name="admin-institutions"),
    path("admin/analytics/", AdminAnalyticsView.as_view(), name="admin-analytics"),
]
