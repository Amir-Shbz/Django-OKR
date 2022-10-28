from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, 
    PermissionsMixin, 
    BaseUserManager,
)
from django.core.validators import (
    MinValueValidator,
    MaxValueValidator,
)
# Create your models here.

class UserProfileManager(BaseUserManager):
    
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(
            email=email,
            name=name,
        )

        user.set_password(password)
        user.save(using=self._db)

        return user
    

    def create_superuser(self, email, name, password):
        user = self.create_user(email, name, password)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        
        return user    



class UserProfile(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    requests = models.ManyToManyField('authin.RequestJoin')
    status = models.ForeignKey(models.UserStatus, blank=True)
    
    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_name(self):
        return self.name

    def __str__(self):
        return self.name        


class RequestJoin(models.Model):
    user = models.ForeignKey('authin.UserProfile',on_delete=models.CASCADE)
    team = models.ForeignKey('main.Team',on_delete=models.PROTECT,null=True)

STATUS_VALIDATOR = [MinValueValidator(0), MaxValueValidator(5)]

class UserStatus(models.Model):
    happiness = models.IntegerChoices(default=0, validator=STATUS_VALIDATOR)
    energy_level = models.IntegerChoices(default=0, validator=STATUS_VALIDATOR)
    work_life_balance = models.IntegerChoices(default=0, validator=STATUS_VALIDATOR)