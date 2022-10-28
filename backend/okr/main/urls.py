from django.urls import URLPattern
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter


from . import views

router = DefaultRouter()
router.register('addteam', views.AddTeamApi)
router.register('addweeklyitem', views.AddWeeklyItem)

app_name = 'main'

urlpatterns = [
    path('',include(router.urls)),
    path('invitelink',views.invitelink.as_view(),name='invitelink'),
    path('gettimeline',views.GetTimeLineAPI.as_view(),name='gettimeline'),
    path('getcalender',views.GetCalenderAPI.as_view(),name='getcalender'),
]
