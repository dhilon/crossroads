from rest_framework import serializers
from crossroadsBe.models import Fact, Profile, StoreItem, Inventory, Quiz, Play, Feedback


class FactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fact
        fields = '__all__'
        read_only_fields = ['id', 'title']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ['id', 'created', 'streak', 'profileAuth', 'points', 'hoursPlayed', 'hoursWon', 'accountId', 'highestStreak', 'highestPoints']
        

class StoreItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreItem
        fields = '__all__'
        read_only_fields = ['id', 'pointsCost', 'name', 'createdAt', 'strengths', 'year_in_school', 'boughtAt']

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'
        read_only_fields = ['id', 'created', 'used', 'myProfile', 'myStoreItem']

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'
        read_only_fields = ['id', 'created', 'rightWord', 'leftWord']

class PlaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Play
        fields = '__all__'
        read_only_fields = ['id', 'created', 'myProfile', 'myQuiz', 'win']

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'
        read_only_fields = ['id', 'text', 'created', 'myProfile']