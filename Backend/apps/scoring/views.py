from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import ScoringInputSerializer, ScoringResultSerializer
from .engine import NEPScoringEngine
from .mapper import compute_nomination_score
from apps.forms.models import NominationHeader


class ScoringCalculateView(APIView):
    """
    API endpoint to trigger scoring engine computations for NEP Excellence Awards.
    Method: POST
    Permission: AllowAny (for flexible testing and integration)
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ScoringInputSerializer(data=request.data)
        if serializer.is_valid():
            results = NEPScoringEngine.calculate_scores(serializer.validated_data)
            output_serializer = ScoringResultSerializer(results)
            return Response(output_serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NominationScoreView(APIView):
    """
    API endpoint to fetch the current institution's live score and status.
    Method: GET
    Permission: IsAuthenticated
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        header = NominationHeader.objects.filter(user=request.user).first()
        if not header:
            return Response({
                'is_started': False,
                'is_submitted': False,
                'scoring': None,
                'header': None
            }, status=status.HTTP_200_OK)

        results = compute_nomination_score(header)

        return Response({
            'is_started': True,
            'is_submitted': header.is_submitted,
            'scoring': results,
            'header': {
                'institution_name': header.institution_name,
                'aishe_code': header.aishe_code,
                'academic_session': header.academic_session,
                'updated_at': header.updated_at
            }
        }, status=status.HTTP_200_OK)
