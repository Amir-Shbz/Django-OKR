import json
from rest_framework import viewsets,views,exceptions,response
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication

from authin import serializers
from authin import models
from authin import permissions
from .services import create_token, user_selector_with_email
from .authentication import UserAuth

# Create your views here.

class SignUpViewSet(viewsets.ModelViewSet):

    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()   
    authentication_classes = (TokenAuthentication,)    
    permission_classes = (permissions.UpdateOwnProfile,)  
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'email',)   
          

#Api for login user with email address
class LoginApi(views.APIView):
    
    permission_classes = (AllowAny,) # Adding permission to everyone
    
    def post(self,request):
        
        email = request.data['email']
        password = request.data['password']
        user = user_selector_with_email(email)
        if user is None or not user.check_password(password):
            raise exceptions.AuthenticationFailed("Invalid Credentials!")
        
        token = create_token(user.id) # Creation token in service class and reuturn token
        res = response.Response(dict(token=token))
        #res.set_cookie(key="jwt", value=token, httponly=True) # Seting token in cookies
        
        return res

#if any apis needs auth:
# add UserAuth class to authentication_classes and IsAuthenticated to permission_classes.
class RequireAuthExampleApi(views.APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (UserAuth,)

    def get(self,request):
        return response.Response("IN")