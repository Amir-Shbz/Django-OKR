from django.urls import path, include
from rest_framework.routers import DefaultRouter

from authin import views

app_name = 'authin'

router = DefaultRouter()
router.register('sign-up', views.SignUpViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.LoginApi.as_view(),name='login'),
]
 
