from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles
import django.contrib.auth
from django.contrib.auth.models import User
from django.utils import timezone
import pytz

# Create your models here.

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])


class Profile(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    streak = models.IntegerField(default = 0)
    points = models.IntegerField(default = 0)
    profileAuth = models.ForeignKey(User, on_delete=models.CASCADE, default="")
    hoursPlayed = models.IntegerField(default = 0)
    hoursWon = models.IntegerField(default = 0)
    highestStreak = models.IntegerField(default = 0)
    highestPoints = models.IntegerField(default = 0)
    
class StoreItem(models.Model):
    pointsCost = models.IntegerField(default=0)
    
    name = models.CharField(max_length=32, default = "ultimate device")
    
    Strength1 = '1'
    Strength2 = '2'
    Strength3 = '3'
    Strength4 = '4'
    Strength5 = '5'
    strengths = [
        (Strength1, '1'),
        (Strength2, '2'),
        (Strength3, '3'),
        (Strength4, '4'),
        (Strength5, '5'),
    ]
    year_in_school = models.CharField(
        max_length=2,
        choices=strengths,
        default=Strength1,
    )
    
    createdAt = models.DateTimeField(auto_now_add=True)
    
    bought = models.BooleanField(default=False)
    boughtAt = models.DateTimeField(null=True, blank=True)
    
    def save(self, *args, **kwargs):
        if (self.bought == False and self.boughtAt is None): #buying the item
            self.boughtAt = timezone.now()
        if (self.bought == True):
            self.boughtAt = None
        super().save(*args, **kwargs)
        
    
class Inventory(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    used = models.BooleanField(default=False)
    myProfile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    myStoreItem = models.ForeignKey(StoreItem, on_delete=models.CASCADE)
    
class Quiz(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    ended = models.DateTimeField(null=True, blank=True)
    rightWord = models.CharField(max_length=32, default = "right")
    leftWord = models.CharField(max_length=32, default = "left")

class Play(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    myProfile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    myQuiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    right = models.BooleanField(default=False)
    left = models.BooleanField(default=False)
    winSide = models.BooleanField(default=False)
    win = models.BooleanField(default=False)
    
    
    

class Feedback(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    text = models.TextField()
    myProfile = models.ForeignKey(Profile, on_delete=models.CASCADE)

class Fact(models.Model):
    title = models.TextField(max_length=200)


    