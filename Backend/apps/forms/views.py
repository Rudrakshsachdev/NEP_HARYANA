from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import NominationHeader
from .serializers import NominationHeaderSerializer

class NominationHeaderView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        header = NominationHeader.objects.filter(user=request.user).first()
        if not header:
            return Response({'detail': 'No nomination header found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = NominationHeaderSerializer(header)
        return Response(serializer.data, status=status.HTTP_200_OK)

class NominationHeaderOpenView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        college_name = request.user.college.name if request.user.college else 'Govt College Example'
        aishe_code = request.user.college.aishe_code if request.user.college else 'C-12345'
        
        header, created = NominationHeader.objects.get_or_create(
            user=request.user,
            defaults={
                'institution_name': college_name,
                'aishe_code': aishe_code,
                'institution_type': 'college',
                'head_name': request.user.full_name,
                'head_contact': request.user.email,
                'hei_address': 'Address details pending...',
                'academic_session': '2024-25'
            }
        )
        serializer = NominationHeaderSerializer(header)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

class NominationHeaderDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, form_id):
        try:
            header = NominationHeader.objects.get(form_id=form_id, user=request.user)
        except NominationHeader.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = NominationHeaderSerializer(header)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, form_id):
        try:
            header = NominationHeader.objects.get(form_id=form_id, user=request.user)
        except NominationHeader.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        if header.is_submitted:
            return Response({'detail': 'This form has been submitted and cannot be modified.'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = NominationHeaderSerializer(header, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
