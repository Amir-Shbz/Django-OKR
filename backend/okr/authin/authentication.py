from django.conf import settings
import jwt
from rest_framework import  authentication,exceptions
from .models import UserProfile

#Authentication using cookies with secret code in settings
class UserAuth(authentication.BaseAuthentication):
    def authenticate(self, request):
        user = UserProfile.objects.filter(id=UserAuth.get_active_user_id(request)).first()
        return (user,None)

    def get_active_user_id(request):
        token = request.data.get("token")
        if not token:
            return None
        try:
            payload = jwt.decode(token,settings.JWT_KEY_SECRET,algorithms=['HS256'])
        except:
            raise exceptions.APIException("Unauthorized")
        return payload['id']