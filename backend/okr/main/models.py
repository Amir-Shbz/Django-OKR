from django.db import models
from authin.models import UserProfile
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.

PERCENTAGE_VALIDATOR = [MinValueValidator(0), MaxValueValidator(100)]

class KeyResult(models.Model):
    result = models.CharField(max_length=255)
    intitive = models.CharField(max_length=255)
    progress = models.IntegerField(default=0,validators=PERCENTAGE_VALIDATOR)

class OKR(models.Model):
    object = models.CharField(max_length=255)
    intitive = models.CharField(max_length=255)
    keyResult = models.ManyToManyField(KeyResult)

    def get_progress(self):
        pass

choices_member = (
        ('Manager','manager'),
        ('Member','member'),
    )

class Role(models.Model):
    role = models.CharField(max_length=32,choices=choices_member)

class Team(models.Model):
    name = models.CharField(max_length=255)
    members = models.ManyToManyField(UserProfile,related_name='members',through='Membership')
    okrs = models.ManyToManyField(OKR,blank=True)
    status = models.ForeignKey(models.TeamStatus ,blank=True)

    def create(self,team_name,creatorid):
        manager = UserProfile.objects.filter(id=creatorid).first()
        team = Team(name = team_name)
        team.save()
        role = Role(role="manager")
        role.save()
        mem = Membership(user=manager,team=team,role=role)
        mem.save()
        
        return team

    def all_managers(self):
        users = []
        for member in self.membership_set.all():
            if member.role.role == 'manager' or member.role.role == 'Manager':
                users.append(member.user)
        return users


class Membership(models.Model):
    user = models.ForeignKey(UserProfile,on_delete=models.CASCADE)
    team = models.ForeignKey(Team,on_delete=models.CASCADE)
    role = models.ForeignKey(Role,on_delete=models.PROTECT)

weekly_choices = (
    ('pl','Plan'),
    ('pr','Problem'),
    ('do','Done'),
    ('ls','Lessons'),
    ('id','Ideas'),

)
flag_choices = (
    ('no','none'),
    ('gr','green'),
    ('rd','red'),
    ('bl','blue'),
)

class WeeklyItemModel(models.Model):
    message = models.CharField(max_length=2048)
    post_in = models.CharField(max_length=20,choices=weekly_choices)
    mentions = models.ManyToManyField('authin.UserProfile',related_name='mentions',blank=True)
    comments = models.ManyToManyField('main.CommentModel',blank=True)
    writer = models.ForeignKey('authin.UserProfile',related_name='rel_writer',on_delete=models.PROTECT)
    likes = models.ManyToManyField('authin.UserProfile',related_name='likes',blank=True)
    private = models.BooleanField(default=False)
    build_date = models.DateTimeField(auto_now_add=True,blank=True)
    due_date = models.DateTimeField( default=None,blank=True,null=True)
    attach = models.ManyToManyField('main.Attachment',blank=True)
    flag = models.CharField(max_length=20,choices=flag_choices,default='none')


    def create(message, post_in, writer):
        item = WeeklyItemModel(message=message,post_in=post_in,writer=writer)
        item.save()
        return item

class CommentModel(models.Model):
    message =  models.CharField(max_length=1024)
    mentions = models.ManyToManyField('authin.UserProfile',related_name='com_mentions',blank=True)
    attach = models.ManyToManyField('main.Attachment',blank=True)
    likes = models.ManyToManyField('authin.UserProfile',related_name='com_likes',blank=True)
    buil_date = models.DateTimeField(auto_now_add=True,blank=True)



class Attachment(models.Model):
    link = models.CharField(max_length=2048)

STATUS_VALIDATOR = [MinValueValidator(0), MaxValueValidator(5)]

class TeamStatus(models.Model):
    happiness = models.IntegerChoices(default=0, validator=STATUS_VALIDATOR)
    team_spirit = models.IntegerChoices(default=0, validator=STATUS_VALIDATOR)
    energy_level = models.IntegerChoices(default=0, validator=STATUS_VALIDATOR)
    work_life_balance = models.IntegerChoices(default=0, validator=STATUS_VALIDATOR)
