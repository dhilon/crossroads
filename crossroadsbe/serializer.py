from rest_framework import serializers
from crossroadsbe.models import Fact, Profile, StoreItem, Inventory, Quiz, Play, Feedback


class FactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fact
        fields = ['id', 'title']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'created', 'streak', 'profileAuth', 'points', 'hoursPlayed', 'hoursWon', 'accountId', 'highestStreak', 'highestPoints']

class StoreItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreItem
        fields = ['id', 'pointsCost', 'name', 'created', 'strengths', 'year_in_school']

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = ['id', 'created', 'used', 'myProfile', 'myStoreItem']

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'created', 'rightWord', 'leftWord']

class PlaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Play
        fields = ['id', 'created', 'myProfile', 'myQuiz', 'right', 'left', 'win']

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'text', 'created', 'myProfile']