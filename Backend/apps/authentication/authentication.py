from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions
from django.contrib.auth import get_user_model
from .utils import decode_token
from django.conf import settings
from jwt import decode
import jwt

User = get_user_model()

class JWTCookieAuthentication(BaseAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get('access_token')
        
        if not access_token:
            return None
            
        payload = decode_token(access_token)
        if not payload:
            raise exceptions.AuthenticationFailed('Invalid or expired access token')
            
        user_id = payload.get('user_id')
        if not user_id:
            raise exceptions.AuthenticationFailed('Token lacks user ID')
            
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('User not found')
            
        if not user.is_active:
            raise exceptions.AuthenticationFailed('User account is disabled')
            
        return (user, None)
