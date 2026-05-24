from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import IsAdminRole
from .services import (
    get_all_applications,
    get_analytics,
    get_dashboard_stats,
    get_institutions_summary,
)


class AdminDashboardStatsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def get(self, request):
        return Response(get_dashboard_stats(), status=status.HTTP_200_OK)


class AdminApplicationsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def get(self, request):
        return Response(
            {"applications": get_all_applications()},
            status=status.HTTP_200_OK,
        )


class AdminInstitutionsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def get(self, request):
        return Response(
            {"institutions": get_institutions_summary()},
            status=status.HTTP_200_OK,
        )


class AdminAnalyticsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def get(self, request):
        return Response(get_analytics(), status=status.HTTP_200_OK)
