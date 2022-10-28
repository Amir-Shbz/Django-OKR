from rest_framework import serializers

from authin.authentication import UserAuth
from authin.serializers import UserProfileSerializer

from . import models
from authin.models import UserProfile



class TeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Team
        fields = ('id', 'name','members', 'status')
 
    def create(self, validated_data):
        team = models.Team().create(
            team_name = validated_data['name'],
            creatorid = UserAuth.get_active_user_id(self.context['request'])
        )

        return team


class OKRSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OKR
        fields = ('id','object','intitive','keyresult')
    

class WeeklyItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.WeeklyItemModel
        fields = ('id','message','post_in')
    def create(self,validated_data):
        weeklyitem = models.WeeklyItemModel.create(
                message=validated_data['message'],
                post_in=validated_data['post_in'],
                writer=UserProfile.objects.filter(id=UserAuth.get_active_user_id(self.context['request'])).first()
            )
        return weeklyitem

    def update(self, instance, validated_data):

        wr = validated_data.pop('writer', None)   
        item = super().update(instance, validated_data)

        if wr:
            item.writer = wr
            item.save() 

        return item   