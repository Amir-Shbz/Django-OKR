from authin import views
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.test import TestCase

# Create your tests here.

CREATE_USER_URL = reverse('userprofile-list')


def create_user(**params):
    return get_user_model().objects.create_user(**params)


class SignUpTest(TestCase):
    """ Testing Sign-Up Api"""

    def setUp(self):
        self.client = APIClient()

    def test_create_user_success(self):

        sample = {
            'email': 'test@example.com',
            'password': '12345',
            'name': 'Test Name'
        }    
        res = self.client.post(CREATE_USER_URL, sample)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(email=sample['email'])
        self.assertTrue(user.check_password(sample['password']))
        self.assertNotIn('password', res.data)

    def test_user_with_email_exists_error(self):

        sample = {
            'email': 'test@example.com',
            'password': '12345',
            'name': 'Test Name'
        }
        create_user(**sample) 
        res = self.client.post(CREATE_USER_URL, sample)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
  

class LoginTest(APITestCase):

    def signup(self):
        data = {"name":"user","email":"email@gmail.com","password":"1234"}
        res = self.client.post(reverse('userprofile-list'),data)

    def test_login_wrong_email_user_fails(self):
        self.signup()
        data = {'email':'wrong@gmail.com','password':'1234'}
        res = self.client.post(reverse('login'),data)
        self.assertEqual(res.status_code,status.HTTP_403_FORBIDDEN)

    def test_login_wrong_pass_user_fails(self):
        self.signup()
        data = {'email':'email@gmail.com','password':'wrong'}
        res = self.client.post(reverse('login'),data)
        self.assertEqual(res.status_code,status.HTTP_403_FORBIDDEN)

    def test_login_user_success(self):
        self.signup()
        data = {'email':'email@gmail.com','password':'1234'}
        res = self.client.post(reverse('login'),data)
        self.assertEqual(res.status_code,status.HTTP_200_OK)
        self.assertIsNotNone(res.json()['token']) 