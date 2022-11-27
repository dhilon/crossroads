from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles
import django.contrib.auth
from django.contrib.auth.models import User
from django.utils import timezone
import pytz
from django.core.exceptions import ValidationError

# Create your models here.

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])


class Profile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE, primary_key=True)

    created = models.DateTimeField(auto_now_add=True)
    streak = models.IntegerField(default = 0)
    points = models.IntegerField(default = 0)
    hoursPlayed = models.IntegerField(default = 0)
    hoursWon = models.IntegerField(default = 0)
    highestStreak = models.IntegerField(default = 0)
    highestPoints = models.IntegerField(default = 0)

class Inventory(models.Model):
    user = models.ForeignKey(User, related_name='inventory', on_delete=models.CASCADE)

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
    powerLevel = models.CharField(
        max_length=2,
        choices=strengths,
        default=Strength1,
    )
    
    createdAt = models.DateTimeField(auto_now_add=True)
    

class InventoryStoreItem(models.Model):
    inventory = models.ForeignKey(Inventory, related_name='inventoryStoreItems', on_delete=models.CASCADE)
    storeItem = models.ForeignKey(StoreItem, related_name='inventoryStoreItems', on_delete=models.CASCADE)
    boughtAt = models.DateTimeField(auto_now_add=True)
        
class Quiz(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    ended = models.DateTimeField(null=True, blank=True)
    rightWord = models.CharField(max_length=32, default = "right")
    leftWord = models.CharField(max_length=32, default = "left")

class Play(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    player = models.ForeignKey(User, related_name='plays', on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, related_name='plays', on_delete=models.CASCADE)

    choices = [
        ('Right', 'Right'),
        ('Left', 'Left')
    ]
    choice = models.CharField(max_length=5, choices=choices, default='Left')
    
    def clean(self):
        if (self.quiz.ended is not None):
            raise ValidationError({'myQuiz': 'The quiz has ended and can no longer be voted'})

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)


class Feedback(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    text = models.TextField()
    author = models.ForeignKey(User, related_name='feedbacks', on_delete=models.CASCADE)

class Fact(models.Model):
    title = models.TextField(max_length=200)


    