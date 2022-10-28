from datetime import datetime
import json
from django.conf import settings
from django.shortcuts import render
from rest_framework.exceptions import PermissionDenied,ValidationError
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from authin.models import UserProfile
from . import models,serializers
from okr.encryption_util import encrypt
import authin
from .models import WeeklyItemModel
from django.core import serializers as ser


# Create your views here.

class AddTeamApi(ModelViewSet):
    serializer_class = serializers.TeamSerializer
    queryset = models.Team.objects.all()
    permission_classes = (IsAuthenticated,)
    authentication_classes = (authin.authentication.UserAuth,)

class invitelink(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (authin.authentication.UserAuth,)

    def post(self,request):
        teamid = request.data['teamid']
        team = models.Team.objects.filter(id=teamid).first()
        user = authin.models.UserProfile.objects.filter(id=authin.authentication.UserAuth.get_active_user_id(request)).first()

        if not team:
            raise ValidationError("team not exists!")

        if user not in team.all_managers():
            raise PermissionDenied('You are not manager user')

        data = encrypt(str(user.id))

        URL = f'{settings.HOST_NAME_URL}join/{data}/{teamid}' 

        res = Response(dict(link=URL))

        return res

class AddWeeklyItem(ModelViewSet):
    serializer_class = serializers.WeeklyItemSerializer
    queryset = models.WeeklyItemModel.objects.all()
    permission_classes = (IsAuthenticated,)
    authentication_classes = (authin.authentication.UserAuth,)

class GetTimeLineAPI(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (authin.authentication.UserAuth,)

    def post(self,request):
        from_date = request.data['from']
        until_date = request.data['until']
        userid = request.data['userid']

        ob_from = datetime.strptime(from_date, '%Y-%m-%d')

        ob_until = datetime.strptime(until_date, '%Y-%m-%d')

        if ob_from > ob_until:
            raise ValidationError("Dates are wrong!")


        items_model = WeeklyItemModel.objects.filter(build_date__range=[from_date, until_date])

        user = UserProfile.objects.filter(id=userid).first()
        if not user:
            raise ValidationError("User id is wrong!")
        items_model = items_model.filter(writer=user)
        items_model = items_model.order_by("build_date").all()
        items = []

        for item in items_model:
            items = items + json.loads(ser.serialize('json', [ item, ]))

        res = Response(dict(items=items))

        return res

class GetCalenderAPI(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (authin.authentication.UserAuth,)

    def post(self,request):
        from_date = request.data['from']
        until_date = request.data['until']
        userid = request.data['userid']

        ob_from = datetime.strptime(from_date, '%Y-%m-%d')

        ob_until = datetime.strptime(until_date, '%Y-%m-%d')

        if ob_from > ob_until:
            raise ValidationError("Dates are wrong!")

        user = UserProfile.objects.filter(id=userid).first()
        if not user:
            raise ValidationError("User id is wrong!")

        items_model = WeeklyItemModel.objects.filter(build_date__range=[from_date, until_date])
        items_model = items_model.filter(writer=user)
        items_model = items_model.exclude(post_in='ls').exclude(post_in='id')
        items_model = items_model.order_by("build_date").all()
        items = dict()
        for item in items_model:
            
            date = str(item.build_date)[:10]
            if not date in items.keys():
                items[date] = []
            
            items[str(date)] = items[str(date)] + json.loads(ser.serialize('json', [ item, ]))



        res = Response(dict(items=items))

        return res