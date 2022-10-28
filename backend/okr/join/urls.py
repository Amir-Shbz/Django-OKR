
from django.urls import path
from . import views
urlpatterns = [
    path('response-invite',views.ResponseJoinRequest.as_view(),name='resrequest'),
#    path('<str:name>',views.JoinAPI.as_view(),name='join'),
#    path('<str:name>/<str:teamid>',views.JoinAPI.as_view(),name='join'),
]