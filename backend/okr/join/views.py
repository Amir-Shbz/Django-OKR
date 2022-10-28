from ntpath import join
from django.shortcuts import render
import authin
from rest_framework import views,permissions,response,exceptions
from authin.models import UserProfile,RequestJoin
from main.models import Team,Role,Membership
# Create your views here.

from okr.encryption_util import decrypt
from django.conf import settings
from authin.authentication import UserAuth

# class JoinAPI(views.APIView):
#     permission_classes = (permissions.IsAuthenticated,)
#     authentication_classes = (authin.authentication.UserAuth,)
#     def get(self,request,name,teamid=-1):
#         userid = decrypt(name)
#         user = UserProfile.objects.filter(id=userid).first()
#         if not user:
#             raise exceptions.ParseError('User that provides this link has been deleted!')
#         joinrequest = RequestJoin(
#             user=UserProfile.objects.filter(id=UserAuth.get_active_user_id(request)).first(),
#         )
#         if not teamid == -1:
#             joinrequest.team = Team.objects.filter(id=teamid).first()

#         joinrequest.save() 
#         user.save()

#         user.requests.add(joinrequest)
        
#         return response.Response('request sent.')

class ResponseJoinRequest(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authin.authentication.UserAuth,)
    def post(self,request):
        confirm = (int(request.data['confirm']) == 1)
        requestid = int(request.data['requestid'])
        teamid = int(request.data['teamid'])

        activeuser = UserProfile.objects.filter(id=UserAuth.get_active_user_id(request)).first()
        req = RequestJoin.objects.filter(id=requestid).first()
        user = req.user
        team = Team.objects.filter(id=teamid).first()

        if not team:
            raise exceptions.ValidationError("Wrong team id!")

        if confirm:
            if user in team.members.all():
                raise exceptions.ValidationError("User already exists!")
            role = Role(role="member")
            role.save()
            mem = Membership(user=user,team=team,role=role)
            mem.save()
            activeuser.requests.remove(req)
            req.delete()
            activeuser.save()
            return response.Response(dict(message=f'Add to team {team.name} successfuly.'))

        activeuser.requests.remove(req)
        req.delete()
        activeuser.save()
        return response.Response(dict(message=f'Request removed successfuly.'))
            


