import json
from django.urls import reverse
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
import datetime

from rest_framework import status
from rest_framework.test import APITestCase

from .models import College, RefreshToken
from .utils import generate_access_token, decode_token, hash_token

User = get_user_model()

class JWTAuthTests(APITestCase):
    def setUp(self):
        # Create a mock college
        self.college = College.objects.create(name="Test College", aishe_code="C-TEST1")
        # Create a user
        self.user_password = "SecurePassword123!"
        self.user = User.objects.create_user(
            email="test@college.edu.in",
            full_name="Dr. Test User",
            role="principal",
            college=self.college,
            password=self.user_password
        )

    def test_signup(self):
        url = reverse('signup')
        data = {
            "fullName": "New User",
            "email": "newuser@college.edu.in",
            "collegeId": self.college.id,
            "role": "principal",
            "password": "Password123!"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('user', response.data)
        self.assertIn('access_token', response.cookies)
        self.assertIn('refresh_token', response.cookies)
        self.assertTrue(response.cookies['access_token']['httponly'])
        self.assertTrue(response.cookies['refresh_token']['httponly'])

    def test_login_success(self):
        url = reverse('login')
        data = {
            "email": "test@college.edu.in",
            "password": self.user_password
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('user', response.data)
        self.assertIn('access_token', response.cookies)
        self.assertIn('refresh_token', response.cookies)
        
        # Verify refresh token stored in database
        rf_token = response.cookies['refresh_token'].value
        hashed = hash_token(rf_token)
        self.assertTrue(RefreshToken.objects.filter(token=hashed).exists())

    def test_login_invalid_credentials(self):
        url = reverse('login')
        data = {
            "email": "test@college.edu.in",
            "password": "WrongPassword"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertNotIn('access_token', response.cookies)

    def test_refresh_token_success(self):
        # Log in first to get tokens
        login_url = reverse('login')
        login_response = self.client.post(login_url, {
            "email": "test@college.edu.in",
            "password": self.user_password
        }, format='json')
        
        refresh_token = login_response.cookies['refresh_token'].value
        
        # Call refresh endpoint
        self.client.cookies['refresh_token'] = refresh_token
        refresh_url = reverse('refresh')
        response = self.client.post(refresh_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access_token', response.cookies)
        self.assertIn('refresh_token', response.cookies)
        
        # Old refresh token should be revoked
        old_hashed = hash_token(refresh_token)
        old_db_token = RefreshToken.objects.get(token=old_hashed)
        self.assertTrue(old_db_token.is_revoked)

    def test_refresh_token_revocation_reuse(self):
        login_url = reverse('login')
        login_response = self.client.post(login_url, {
            "email": "test@college.edu.in",
            "password": self.user_password
        }, format='json')
        
        refresh_token = login_response.cookies['refresh_token'].value
        
        # Use it once to rotate it
        self.client.cookies['refresh_token'] = refresh_token
        refresh_url = reverse('refresh')
        self.client.post(refresh_url)
        
        # Attempt reuse: use the OLD refresh token again
        self.client.cookies['refresh_token'] = refresh_token
        response = self.client.post(refresh_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_me_endpoint_authenticated(self):
        login_url = reverse('login')
        login_response = self.client.post(login_url, {
            "email": "test@college.edu.in",
            "password": self.user_password
        }, format='json')
        
        access_token = login_response.cookies['access_token'].value
        self.client.cookies['access_token'] = access_token
        
        me_url = reverse('me')
        response = self.client.get(me_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], "test@college.edu.in")

    def test_logout(self):
        login_url = reverse('login')
        login_response = self.client.post(login_url, {
            "email": "test@college.edu.in",
            "password": self.user_password
        }, format='json')
        
        refresh_token = login_response.cookies['refresh_token'].value
        self.client.cookies['refresh_token'] = refresh_token
        self.client.cookies['access_token'] = login_response.cookies['access_token'].value
        
        logout_url = reverse('logout')
        response = self.client.post(logout_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Cookies should be cleared (empty or deleted)
        self.assertEqual(response.cookies['access_token'].value, '')
        self.assertEqual(response.cookies['refresh_token'].value, '')
        
        # Refresh token in DB should be revoked
        hashed = hash_token(refresh_token)
        db_token = RefreshToken.objects.get(token=hashed)
        self.assertTrue(db_token.is_revoked)
