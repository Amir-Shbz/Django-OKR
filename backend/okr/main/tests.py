from calendar import day_abbr
from datetime import date, datetime
from os import link
from authin.models import UserProfile
from okr.encryption_util import decrypt
from main.models import Team, WeeklyItemModel
from main import views
from rest_framework.test import APITestCase, APIClient
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from main.serializers import WeeklyItemSerializer

# Create your tests here.
def auth(client):
    data = {"name":"user","email":"email@gmail.com","password":"1234"}
    ressing = client.post(reverse('userprofile-list'),data)
    res = client.post(reverse('login'),data)
    return {'token':res.json()['token'] , 'id' : ressing.json()['id']}

class AddTeamApiTest(APITestCase):
    

    def create_data(self,hasAuth=True):
        if(hasAuth):
            useract = UserProfile.objects.filter(email='email@gmail.com').first()
        else:
            useract = UserProfile.objects.create_user(name='user',email="email@gmail.com",password="1234")
        return {'active':useract}

    def test_add_team(self):
        authdata = auth(self.client)
        data = self.create_data()

        #save data before sending request
        teamcount = Team.objects.all().count()
        userteamscount = data['active'].membership_set.all().count()
        teammanager = data['active']


        #send data  
        datares = {'name' : 'team-name','token':authdata['token']}
        res = self.client.post(reverse('team-list'),datares)
        
        #assertions
        self.assertEqual(res.status_code,status.HTTP_201_CREATED)
        self.assertEqual(Team.objects.all().count(),teamcount+1)
        self.assertEqual(data['active'].membership_set.all().count(),userteamscount+1)
        assert teammanager in Team.objects.all().first().members.all()

    def test_add_team_no_auth(self):
        data = self.create_data(hasAuth=False)

        #save data before sending request
        teamcount = Team.objects.all().count()
        userteamscount = data['active'].membership_set.all().count()
        teammanager = data['active']


        #send data  
        datares = {'name' : 'team-name'}
        res = self.client.post(reverse('team-list'),datares)

        #assertions
        self.assertEqual(res.status_code,status.HTTP_403_FORBIDDEN)
        self.assertEqual(Team.objects.all().count(),teamcount)
        self.assertEqual(data['active'].membership_set.all().count(),userteamscount)

    def test_add_team_wrong_data(self):
        authdata = auth(self.client)
        data = self.create_data()

        #save data before sending request
        teamcount = Team.objects.all().count()
        userteamscount = data['active'].membership_set.all().count()
        teammanager = data['active']


        #send data  
        datares = {'wrong' : 'team-name','token':authdata['token']}
        res = self.client.post(reverse('team-list'),datares)

        #assertions
        self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Team.objects.all().count(),teamcount)
        self.assertEqual(data['active'].membership_set.all().count(),userteamscount)

class InvitelinkTest(APITestCase):

    def create_data(self,hasAuth=True):
        if(hasAuth):
            useract = UserProfile.objects.filter(email='email@gmail.com').first()
        else:
            useract = UserProfile.objects.create_user(name='user',email="email@gmail.com",password="1234")
        return {'active':useract}

    def test_invite_link(self):
        authdata = auth(self.client)
        data = self.create_data()
        team = Team().create(
            team_name = 'name',
            creatorid = data['active'].id
        )

        #save data

        #send request
        datareq = {"teamid":team.id,'token':authdata['token']}
        res = self.client.post(reverse("invitelink"),datareq)

        #assertions
        #t = self.client.get(res.json()['link'],data={'token':authdata['token']})
        
        self.assertEqual(res.status_code,status.HTTP_200_OK)
        #self.assertEqual(t.status_code,status.HTTP_200_OK)
        self.assertEqual(int(decrypt(res.json()['link'].split('/join/')[1].split('/')[0])),data['active'].id)

    def test_invite_link_not_manager(self):
        authdata = auth(self.client)
        data = self.create_data()
        manager = UserProfile.objects.create_user(name='manager',email="manager@gmail.com",password="1234")

        team = Team().create(
            team_name = 'name',
            creatorid = manager.id
        )

        #save data

        #send request
        datareq = {"teamid":team.id,'token':authdata['token']}
        res = self.client.post(reverse("invitelink"),datareq)

        #assertions
        self.assertEqual(res.status_code,status.HTTP_403_FORBIDDEN)

    
    def test_invite_link_no_auth(self):
        data = self.create_data(hasAuth=False)

        team = Team().create(
            team_name = 'name',
            creatorid = data['active'].id
        )

        #save data

        #send request
        datareq = {"teamid":team.id}
        res = self.client.post(reverse("invitelink"),datareq)

        #assertions
        self.assertEqual(res.status_code,status.HTTP_403_FORBIDDEN)

    def test_invite_link_team_not_exists(self):
        authdata = auth(self.client)
        data = self.create_data()
        teamid = Team.objects.all().count() + 1
        #save data

        #send request
        datareq = {"teamid":teamid,'token':authdata['token']}
        res = self.client.post(reverse("invitelink"),datareq)

        #assertions
        self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)


class PublicAddWeeklyItemTest(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):

        res = self.client.get('main:addweeklyitem-list')

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateAddWeeklyItemTest(TestCase):
    
    payload = {
            'email': 'test@example.com',
            'password': '12345',
            'name': 'Test',
        } 


    def test_retrieve_weekly_items(self):

        sample = {
            'message': 'Test Item',
            'post_in': 'pl',
            'writer': UserProfile.objects.filter(id=self.writerid).first(),
        }

        WeeklyItemModel.objects.create(**sample)
        WeeklyItemModel.objects.create(**sample)

        res = self.client.get('main:addweeklyitem-list')

        items = WeeklyItemModel.objects.all().order_by('-id')
        serializer = WeeklyItemSerializer(items, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)   
        self.assertEqual(res.data, serializer.data)

    def test_weekly_item_adding_success(self): 

        sample = {
            'message': 'Test Item',
            'post_in': 'pl',
            'writer': UserProfile.objects.filter(id=authdata['id']).first(),
            'token':authdata['token'],
        }
        res = self.client.post(reverse('weeklyitemmodel-list'), sample)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_partial_update(self):

        sample = {
            'message': 'Test Item',
            'post_in': 'pl',
            'writer': UserProfile.objects.filter(id=self.writerid).first(),
        }

        item = WeeklyItemModel.objects.create(**sample)
        payload = {'message': 'New Test Item'}
        url = reverse('main:addweeklyitem-detail', args=[item.id])
        res = self.client.patch(url, payload)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        item.refresh_from_db()
        self.assertEqual(item.message, payload['message'])
        self.assertEqual(item.post_in, sample['post_in'])
        self.assertEqual(item.writer, sample['writer'])

    def test_delete_weekly_item(self):

        sample = {
            'message': 'Test Item',
            'post_in': 'pl',
            'writer': UserProfile.objects.filter(id=self.writerid).first(),
        }

        item = WeeklyItemModel.objects.create(**sample)

        url = reverse('main:addweeklyitem-detail', args=[item.id])
        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(WeeklyItemModel.objects.filter(id=item.id).exists())





class GetTimeLineTest(TestCase):
 
        
    def create_data(self,token):
        data = {
            'message': 'Test Item',
            'post_in': 'pl',
            'writer': self.userid,
            'token':token,
        }
        res = self.client.post(reverse('weeklyitemmodel-list'), data)

    def test_gettimeline_success(self):  
        authdata = auth(self.client)
        self.userid = authdata['id']
        self.create_data(authdata['token'])

        today = date.today()
        month, year = (today.month-1, today.year) if today.month != 1 else (12, today.year-1)
        date_pre_month = date(day=today.day, month=month, year=year)
        day = today.day + 1
        today = date(day=day, month=today.month, year=today.year)

        data = {'from':str(date_pre_month),'until':str(today),'userid':self.userid,'token':authdata['token']}
        res = self.client.post(reverse('gettimeline'), data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.json()['items']), 1)


    def test_gettimeline_no_auth(self): 
        authdata = auth(self.client)
        self.userid = authdata['id']
        self.create_data(authdata['token'])

        today = date.today()
        month, year = (today.month-1, today.year) if today.month != 1 else (12, today.year-1)
        date_pre_month = date(day=today.day, month=month, year=year)

        data = {'from':str(date_pre_month),'until':str(today),'userid':self.userid}
        res = self.client.post(reverse('gettimeline'), data)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_gettimeline_not_valid_date(self): 
        authdata = auth(self.client)
        self.userid = authdata['id']
        self.create_data(authdata['token'])

        today = date.today()
        month, year = (today.month-1, today.year) if today.month != 1 else (12, today.year-1)
        date_pre_month = date(day=today.day, month=month, year=year)

        data = {'from':str(today),'until':str(date_pre_month),'userid':self.userid,'token':authdata['token']}
        res = self.client.post(reverse('gettimeline'), data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_gettimeline_wronge_user(self): 
        authdata = auth(self.client)
        self.userid = UserProfile.objects.all().count() + 10
        self.create_data(authdata['token'])

        today = date.today()
        month, year = (today.month-1, today.year) if today.month != 1 else (12, today.year-1)
        date_pre_month = date(day=today.day, month=month, year=year)

        data = {'from':str(date_pre_month),'until':str(today),'userid':self.userid,'token':authdata['token']}
        res = self.client.post(reverse('gettimeline'), data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)


class GetCalenderTest(TestCase):
 
        
    def create_data(self,token):
        data = {
            'message': 'Test Item',
            'post_in': 'pl',
            'writer': self.userid,
            'token':token,
        }
        res = self.client.post(reverse('weeklyitemmodel-list'), data)

    def test_getcalender_success(self):  
        authdata = auth(self.client)
        self.userid = authdata['id']
        self.create_data(authdata['token'])

        today = date.today()
        month, year = (today.month-1, today.year) if today.month != 1 else (12, today.year-1)
        date_pre_month = date(day=today.day, month=month, year=year)
        day = today.day + 1
        today = date(day=day, month=today.month, year=today.year)

        data = {'from':str(date_pre_month),'until':str(today),'userid':self.userid,'token':authdata['token']}
        res = self.client.post(reverse('getcalender'), data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.json()['items']), 1)


    def test_getcalender_no_auth(self): 
        authdata = auth(self.client)
        self.userid = authdata['id']
        self.create_data(authdata['token'])

        today = date.today()
        month, year = (today.month-1, today.year) if today.month != 1 else (12, today.year-1)
        date_pre_month = date(day=today.day, month=month, year=year)

        data = {'from':str(date_pre_month),'until':str(today),'userid':self.userid}
        res = self.client.post(reverse('getcalender'), data)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_getcalender_not_valid_date(self): 
        authdata = auth(self.client)
        self.userid = authdata['id']
        self.create_data(authdata['token'])

        today = date.today()
        month, year = (today.month-1, today.year) if today.month != 1 else (12, today.year-1)
        date_pre_month = date(day=today.day, month=month, year=year)

        data = {'from':str(today),'until':str(date_pre_month),'userid':self.userid,'token':authdata['token']}
        res = self.client.post(reverse('getcalender'), data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_getcalender_wronge_user(self): 
        authdata = auth(self.client)
        self.userid = UserProfile.objects.all().count() + 10
        self.create_data(authdata['token'])

        today = date.today()
        month, year = (today.month-1, today.year) if today.month != 1 else (12, today.year-1)
        date_pre_month = date(day=today.day, month=month, year=year)

        data = {'from':str(date_pre_month),'until':str(today),'userid':self.userid,'token':authdata['token']}
        res = self.client.post(reverse('getcalender'), data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
