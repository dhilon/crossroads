from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles
import django.contrib.auth
from django.contrib.auth.models import User

# Create your models here.

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])

class Profile(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    streak = models.IntegerField(default = 0)
    points = models.IntegerField(default = 0)
    profileAuth = models.ForeignKey(User, on_delete=models.CASCADE)
    #itemsUsed, hoursPlayed, hoursWon, itemsLeft, accountId, highestRanks all still need to be added

class StoreItem(models.Model):
    pointsCost = models.IntegerField()
    Strength1 = '1'
    Strength2 = '2'
    Strength3 = '3'
    Strength4 = '4'
    Strength5 = '5'
    Strengths = [
        (Strength1, '1'),
        (Strength2, '2'),
        (Strength3, '3'),
        (Strength4, '4'),
        (Strength5, '5'),
    ]
    year_in_school = models.CharField(
        max_length=2,
        choices=Strengths,
        default=Strength1,
    )
    

class Inventory(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    used = models.BooleanField(default=False)
    myProfile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    myStoreItem = models.ForeignKey(StoreItem, on_delete=models.CASCADE)
    
class Quiz(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    rightWord = models.CharField(max_length=32, default = "right")
    leftWord = models.CharField(max_length=32, default = "left")

class Plays(models.Model):
    myProfile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    myQuiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    right = models.BooleanField(default=False)
    left = models.BooleanField(default=False)
    win = models.BooleanField(default=True)

class Feedback(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    text = models.TextField()
    myProfile = models.ForeignKey(Profile, on_delete=models.CASCADE)

class Facts(models.Model):
    text = models.TextField(choices=STYLE_CHOICES, default='friendly', max_length=200)


    