import email
from ntpath import join
from venv import create
from rest_framework import status
from django.urls import reverse
from authin.models import UserProfile,RequestJoin
from okr.encryption_util import encrypt

from join import views
from rest_framework.test import APITestCase

from main.models import Team
# Create your tests here.

def auth(client):
    data = {"name":"user","email":"email@gmail.com","password":"1234"}
    ressing = client.post(reverse('userprofile-list'),data)
    res = client.post(reverse('login'),data)
    return {'token':res.json()['token'] , 'id' : ressing.json()['id']}


# class JoinApiTest(APITestCase):


#     def setUp(self):
#         self.user = UserProfile.objects.create_user(name='name',email="email@gmail.com",password="1234")
#         self.useract = UserProfile.objects.filter(email="email@gmail.com").first()
#         self.team = Team().create(team_name='test',creatorid=self.useract.id)



#     def test_join_api_with_team_id(self):
#         #data = self.create_link_data()
#         reqcount = RequestJoin.objects.all().count()
#         userreqcount = self.user.requests.all().count()
#         res = self.client.get(reverse('join',kwargs={'name':encrypt(self.user.id),'teamid':self.team.id}))
#         self.assertEqual(res.status_code,status.HTTP_200_OK)
#         self.assertEqual(RequestJoin.objects.count(),reqcount + 1)
#         self.assertEqual(self.user.requests.all().count(),userreqcount + 1)

#     def test_join_api_no_team_id(self):
#         reqcount = RequestJoin.objects.all().count()
#         userreqcount = self.user.requests.all().count()
#         self.auth()
#         res = self.client.get(reverse('join',kwargs={'name':encrypt(self.user.id)}))
#         self.assertEqual(res.status_code,status.HTTP_200_OK)
#         self.assertEqual(RequestJoin.objects.all().count(),reqcount + 1)
#         self.assertEqual(self.user.requests.all().count(),userreqcount + 1)

#     def test_join_api_with_team_id_no_auth(self):
#         reqcount = RequestJoin.objects.all().count()
#         userreqcount = self.user.requests.all().count()
#         res = self.client.get(reverse('join',kwargs={'name':encrypt(self.user.id),'teamid':self.team.id}))
#         self.assertEqual(res.status_code,status.HTTP_403_FORBIDDEN)
#         self.assertEqual(RequestJoin.objects.all().count(),reqcount)
#         self.assertEqual(self.user.requests.all().count(),userreqcount)


#     def test_join_api_with_team_id_wrong_user(self):
#         reqcount = RequestJoin.objects.count()
#         userreqcount = self.user.requests.all().count()
#         self.auth()
#         user = encrypt(UserProfile.objects.count()+1)
#         res = self.client.get(reverse('join',kwargs={'name':user,'teamid':self.team.id}))
#         self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)
#         self.assertEqual(RequestJoin.objects.count(),reqcount)
#         self.assertEqual(self.user.requests.all().count(),userreqcount)

class ResponseJoinRequestTest(APITestCase):

    def create_data(self,hasAuth=True):
        if(hasAuth):
            useract = UserProfile.objects.filter(email='email@gmail.com').first()
        else:
            useract = UserProfile.objects.create_user(name='user',email="emailactres@gmail.com",password="1234")

        user = UserProfile.objects.create_user(name='name',email="emailres@gmail.com",password="1234")
        team = Team().create(team_name='test',creatorid=useract.id)
        req = RequestJoin(user=user,team=team)
        req.save()
        useract.requests.add(req)

        return {"user":user,"team":team,"active":useract,'req':req}

    def test_response_join_request_confirm(self):
        authdata = auth(self.client)
        data = self.create_data()

        #Save data before sending request
        reqcount = RequestJoin.objects.all().count()
        teammember = data['team'].members.all().count()
        userreqcount = data['active'].requests.all().count()
        
        #send request
        reqdata = {'confirm':1,'requestid':data['req'].id,'teamid':data['team'].id,'token':authdata['token']}
        res = self.client.post(reverse('resrequest'),reqdata)

        #assertions
        self.assertEqual(res.status_code,status.HTTP_200_OK)
        self.assertEqual(RequestJoin.objects.all().count(),reqcount-1)
        self.assertEqual(data['active'].requests.all().count(),userreqcount-1)
        self.assertEqual(data['team'].members.all().count(),teammember+1)



    def test_response_join_request_not_confirm(self):
        authdata = auth(self.client)
        data = self.create_data()

        #Save data before sending request
        reqcount = RequestJoin.objects.all().count()
        teammember = data['team'].members.all().count()
        userreqcount = data['active'].requests.all().count()
        
        #send request
        reqdata = {'confirm':0,'requestid':data['req'].id,'teamid':data['team'].id,'token':authdata['token']}
        res = self.client.post(reverse('resrequest'),reqdata)

        #assertions
        self.assertEqual(res.status_code,status.HTTP_200_OK)
        self.assertEqual(RequestJoin.objects.all().count(),reqcount-1)
        self.assertEqual(data['active'].requests.all().count(),userreqcount-1)
        self.assertEqual(data['team'].members.all().count(),teammember)


    def test_response_join_request_no_auth(self):
        
        data = self.create_data(hasAuth=False)

        #Save data before sending request
        reqcount = RequestJoin.objects.all().count()
        teammember = data['team'].members.all().count()
        userreqcount = data['active'].requests.all().count()
        
        #send request
        reqdata = {'confirm':1,'requestid':data['req'].id,'teamid':data['team'].id}
        res = self.client.post(reverse('resrequest'),reqdata)

        #assertions
        self.assertEqual(res.status_code,status.HTTP_403_FORBIDDEN)
        self.assertEqual(RequestJoin.objects.all().count(),reqcount)
        self.assertEqual(data['active'].requests.all().count(),userreqcount)
        self.assertEqual(data['team'].members.all().count(),teammember)

    def test_response_join_request_team_not_exist(self):
        authdata = auth(self.client)
        data = self.create_data()

        #Save data before sending request
        reqcount = RequestJoin.objects.all().count()
        teammember = data['team'].members.all().count()
        userreqcount = data['active'].requests.all().count()

        #send request
        wrongteamid = Team.objects.all().count() + 1
        reqdata = {'confirm':1,'requestid':data['req'].id,'teamid':wrongteamid,'token':authdata['token']}
        res = self.client.post(reverse('resrequest'),reqdata)

        #assertions
        self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)
        self.assertEqual(RequestJoin.objects.all().count(),reqcount)
        self.assertEqual(data['active'].requests.all().count(),userreqcount)
        self.assertEqual(data['team'].members.all().count(),teammember)

    def test_response_join_request_req_not_exist(self):
        authdata = auth(self.client)
        data = self.create_data()

        #Save data before sending request
        reqcount = RequestJoin.objects.all().count()
        teammember = data['team'].members.all().count()
        userreqcount = data['active'].requests.all().count()

        #send request
        wrongreqid = RequestJoin.objects.all().count() + 1
        reqdata = {'confirm':1,'requestid':data['req'].id,'teamid':wrongreqid,'token':authdata['token']}
        res = self.client.post(reverse('resrequest'),reqdata)

        #assertions
        self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)
        self.assertEqual(RequestJoin.objects.all().count(),reqcount)
        self.assertEqual(data['active'].requests.all().count(),userreqcount)
        self.assertEqual(data['team'].members.all().count(),teammember)
        