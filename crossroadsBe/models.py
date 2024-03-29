from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.conf import settings
from rest_framework.authtoken.models import Token

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class Profile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE, primary_key=True)
    created = models.DateTimeField(auto_now_add=True)
    streak = models.IntegerField(default = 0)
    points = models.IntegerField(default = 0)
    hoursPlayed = models.IntegerField(default = 0)
    hoursWon = models.IntegerField(default = 0)
    highestStreakRank = models.IntegerField(default = 0)
    highestStreak = models.IntegerField(default = 0)
    

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
    description = models.TextField(max_length=300, default = 'a random device')
    img = models.URLField(max_length=999, default= 'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60')
    

class InventoryStoreItem(models.Model):
    inventory = models.ForeignKey(Inventory, related_name='inventoryStoreItems', on_delete=models.CASCADE)
    storeItem = models.ForeignKey(StoreItem, related_name='inventoryStoreItems', on_delete=models.CASCADE)
    boughtAt = models.DateTimeField(auto_now_add=True)
        
class Quiz(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    rightWord = models.CharField(max_length=32, default = "right")
    leftWord = models.CharField(max_length=32, default = "left")

    def leftPlayCount(self):
        return Play.objects.filter(quiz = self, choice='Left').count()
    
    def rightPlayCount(self):
        return Play.objects.filter(quiz = self, choice='Right').count()

    def getFromDate(date):
        return Quiz.objects.filter(created__year = date.year,
                            created__month = date.month,
                            created__day = date.day).first();


class Play(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    player = models.ForeignKey(User, related_name='plays', on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, related_name='plays', on_delete=models.CASCADE)

    choices = [
        ('Right', 'Left'),
        ('Left', 'Right')
    ]
    choice = models.CharField(max_length=5, choices=choices, default='Left')
    
    def clean(self):
        checkPlay = list(Play.objects.filter(quiz=self.quiz, player=self.player))
        if (self.id is None and len(checkPlay)!=0):
            raise ValidationError({'alreadyPlayed': 'This quiz has already been played by this player.'})


    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
        


class Feedback(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    text = models.TextField()
    author = models.ForeignKey(User, related_name='feedbacks', on_delete=models.CASCADE)

class Fact(models.Model):
    title = models.TextField(max_length=200)

