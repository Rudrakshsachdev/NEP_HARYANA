import logging

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMultiAlternatives
from smtplib import SMTPException
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import College, CollegeProfile, NominationHeaderSubmission
from .serializers import (
	CollegeLoginSerializer,
	CollegeProfileSerializer,
	CollegeRegistrationSerializer,
	CollegeSerializer,
	NominationHeaderSubmissionSerializer,
	PasswordResetConfirmSerializer,
	PasswordResetRequestSerializer,
)


logger = logging.getLogger(__name__)


class CollegeListView(APIView):
	permission_classes = [AllowAny]

	def get(self, request):
		colleges = College.objects.filter(is_active=True).order_by('name')
		return Response(CollegeSerializer(colleges, many=True).data)


class RegisterView(APIView):
	permission_classes = [AllowAny]

	def post(self, request):
		serializer = CollegeRegistrationSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()
		token, _ = Token.objects.get_or_create(user=user)
		return Response(
			{
				'message': 'Institution account created successfully.',
				'token': token.key,
				'user': CollegeProfileSerializer(user.college_profile).data,
			},
			status=status.HTTP_201_CREATED,
		)


class LoginView(APIView):
	permission_classes = [AllowAny]

	def post(self, request):
		serializer = CollegeLoginSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		email = serializer.validated_data['email']
		password = serializer.validated_data['password']
		user = authenticate(request=request, username=email, password=password)
		if user is None:
			raise AuthenticationFailed('Invalid email or password.')

		token, _ = Token.objects.get_or_create(user=user)
		return Response(
			{
				'message': 'Login successful.',
				'token': token.key,
				'user': CollegeProfileSerializer(user.college_profile).data,
			},
			status=status.HTTP_200_OK,
		)


class MeView(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request):
		profile = CollegeProfile.objects.filter(user=request.user).first()
		return Response(
			{
				'email': request.user.email,
				'username': request.user.username,
				'profile': CollegeProfileSerializer(profile).data if profile else None,
			}
		)


class NominationHeaderSubmissionView(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request):
		profile = CollegeProfile.objects.filter(user=request.user).first()
		if profile is None:
			return Response({'detail': 'College profile not found.'}, status=status.HTTP_404_NOT_FOUND)

		submission = NominationHeaderSubmission.objects.filter(profile=profile).first()
		if submission is None:
			return Response(
				{
					'form_id': None,
					'institution_name': profile.college_name,
					'aishe_code': profile.aishe_code,
					'head_name': profile.full_name,
					'head_contact': request.user.email,
					'hei_address': profile.address,
					'institution_type': 'college',
					'is_saved': False,
				},
				status=status.HTTP_200_OK,
			)

		serializer = NominationHeaderSubmissionSerializer(submission, context={'request': request})
		payload = serializer.data
		payload['is_saved'] = True
		return Response(payload, status=status.HTTP_200_OK)

	def post(self, request):
		profile = CollegeProfile.objects.filter(user=request.user).first()
		if profile is None:
			return Response({'detail': 'College profile not found.'}, status=status.HTTP_404_NOT_FOUND)

		existing = NominationHeaderSubmission.objects.filter(profile=profile).first()
		serializer = NominationHeaderSubmissionSerializer(
			existing,
			data=request.data,
			context={'request': request},
			partial=existing is not None,
		)
		serializer.is_valid(raise_exception=True)
		submission = serializer.save()
		response_data = NominationHeaderSubmissionSerializer(submission, context={'request': request}).data
		response_data['is_saved'] = True
		return Response(
			{
				'message': 'Nomination header saved successfully.',
				'data': response_data,
			},
			status=status.HTTP_200_OK if existing else status.HTTP_201_CREATED,
		)


class NominationHeaderOpenView(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		profile = CollegeProfile.objects.filter(user=request.user).first()
		if profile is None:
			return Response({'detail': 'College profile not found.'}, status=status.HTTP_404_NOT_FOUND)

		submission, _ = NominationHeaderSubmission.objects.get_or_create(
			profile=profile,
			defaults={
				'institution_name': profile.college_name,
				'aishe_code': profile.aishe_code,
				'head_name': profile.full_name,
				'head_contact': request.user.email,
				'hei_address': profile.address,
				'institution_type': NominationHeaderSubmission.InstitutionType.COLLEGE,
			},
		)

		serializer = NominationHeaderSubmissionSerializer(submission, context={'request': request})
		return Response(
			{
				'message': 'Nomination header form opened.',
				'data': serializer.data,
			},
			status=status.HTTP_200_OK,
		)


class NominationHeaderDetailView(APIView):
	permission_classes = [IsAuthenticated]

	def get_object(self, request, form_id):
		profile = CollegeProfile.objects.filter(user=request.user).first()
		if profile is None:
			return None
		return NominationHeaderSubmission.objects.filter(form_id=form_id, profile=profile).first()

	def get(self, request, form_id):
		submission = self.get_object(request, form_id)
		if submission is None:
			return Response({'detail': 'Form not found.'}, status=status.HTTP_404_NOT_FOUND)

		serializer = NominationHeaderSubmissionSerializer(submission, context={'request': request})
		data = serializer.data
		data['is_saved'] = True
		return Response(data, status=status.HTTP_200_OK)

	def put(self, request, form_id):
		submission = self.get_object(request, form_id)
		if submission is None:
			return Response({'detail': 'Form not found.'}, status=status.HTTP_404_NOT_FOUND)

		serializer = NominationHeaderSubmissionSerializer(
			submission,
			data=request.data,
			context={'request': request},
			partial=True,
		)
		serializer.is_valid(raise_exception=True)
		submission = serializer.save()
		data = NominationHeaderSubmissionSerializer(submission, context={'request': request}).data
		data['is_saved'] = True
		return Response(
			{
				'message': 'Nomination header saved successfully.',
				'data': data,
			},
			status=status.HTTP_200_OK,
		)


class PasswordResetRequestView(APIView):
	permission_classes = [AllowAny]

	def post(self, request):
		serializer = PasswordResetRequestSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.get_user()

		if user:
			uid = urlsafe_base64_encode(force_bytes(user.pk))
			token = default_token_generator.make_token(user)
			reset_path = settings.PASSWORD_RESET_PATH.format(uid=uid, token=token)
			reset_url = f"{settings.FRONTEND_URL.rstrip('/')}{reset_path}"
			subject = 'Reset your NEP Haryana portal password'
			context = {
				'user': user,
				'full_name': user.first_name or user.get_username(),
				'reset_url': reset_url,
				'support_email': settings.DEFAULT_FROM_EMAIL,
			}
			text_body = render_to_string('email/password_reset_email.txt', context)
			html_body = render_to_string('email/password_reset_email.html', context)
			message = EmailMultiAlternatives(
				subject=subject,
				body=text_body,
				from_email=settings.DEFAULT_FROM_EMAIL,
				to=[user.email],
			)
			message.attach_alternative(html_body, 'text/html')
			try:
				message.send(fail_silently=False)
			except (SMTPException, OSError) as exc:
				logger.exception('Password reset email failed for user_id=%s: %s', user.pk, exc)

		return Response(
			{
				'message': 'If an account exists for that email address, a reset link has been sent.',
			},
			status=status.HTTP_200_OK,
		)


class PasswordResetConfirmView(APIView):
	permission_classes = [AllowAny]

	def post(self, request):
		serializer = PasswordResetConfirmSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data['user']
		user.set_password(serializer.validated_data['password'])
		user.save(update_fields=['password'])
		Token.objects.filter(user=user).delete()

		return Response(
			{
				'message': 'Password updated successfully. Please sign in with your new password.',
			},
			status=status.HTTP_200_OK,
		)
