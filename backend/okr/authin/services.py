from django.conf import settings
import jwt
import datetime
from .models import UserProfile 

# Select user with email from UserProfile db
def user_selector_with_email(user_email):
    user = UserProfile.objects.filter(email=user_email).first()    
    return user

# Create Token Service with user id and setting expirtion time to 2 hours
def create_token(user_id):
    payload = dict(
        id=user_id,
        exp=datetime.datetime.utcnow() + datetime.timedelta(hours=2),
        iat=datetime.datetime.utcnow(),
    )
    token = jwt.encode(payload,settings.JWT_KEY_SECRET,algorithm='HS256')
    return token
