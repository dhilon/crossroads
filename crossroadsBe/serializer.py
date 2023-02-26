from rest_framework import serializers
from crossroadsBe.models import Fact, InventoryStoreItem, Profile, StoreItem, Inventory, Quiz, Play, Feedback
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']

class FactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fact
        fields = '__all__'
        read_only_fields = ['id', 'title']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only = True)

    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ['id', 'created', 'streak', 'user', 'points', 'hoursPlayed', 'hoursWon', 'highestStreak', 'highestStreakRank']


class StoreItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreItem
        fields = '__all__'
        read_only_fields = ['id', 'pointsCost', 'name', 'powerLevel', 'createdAt', 'description', 'img']
    

class InventoryStoreItemSerializer(serializers.ModelSerializer):
    
    storeItem = StoreItemSerializer(many=False, read_only=True)
    
    class Meta:
        model = InventoryStoreItem
        fields = ['id', 'storeItem', 'boughtAt']
        read_only_fields = ['id', 'storeItem', 'boughtAt']
        


class PlaySerializer(serializers.ModelSerializer):
    player = UserSerializer(read_only=True)

    class Meta:
        model = Play
        fields = '__all__'
        read_only_fields = ['id', 'created', 'player', 'quiz']

    def to_internal_value(self, data):
        return {'choice': data.get('choice')}

    def create(self, validated_data):
        return Play.objects.create(**validated_data)

    def update(self, instance, validated_data):
        Play.save(self=instance)
        return Play.objects.update(**validated_data)

class QuizSerializer(serializers.ModelSerializer):
    plays = serializers.SerializerMethodField("get_plays")
    def get_plays(self, obj):
        plays = Play.objects.filter(quiz = obj, player=self.context['user'])
        plays = PlaySerializer(plays, many=True)
        return plays.data

    class Meta:
        model = Quiz
        fields = '__all__'
        read_only_fields = ['id', 'created', 'rightWord', 'leftWord', 'ended', 'leftPlayCount', 'rightPlayCount', 'plays']

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'
        read_only_fields = ['id', 'text', 'created', 'author']