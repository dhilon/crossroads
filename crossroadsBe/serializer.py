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
    
    isBought = serializers.SerializerMethodField()
    
    class Meta:
        model = StoreItem
        fields = '__all__'
        read_only_fields = ['id', 'pointsCost', 'name', 'powerLevel', 'createdAt', 'description', 'img', 'isBought']

    def get_isBought(self, storeItem):
        user = self.context['user']
        inventory = Inventory.objects.get(user=user)
        return storeItem.inventoryStoreItems.filter(inventory=inventory).count()>=1
    

class InventoryStoreItemSerializer(serializers.ModelSerializer):
    
    storeItem = StoreItemSerializer(many=False, read_only=True)
    
    class Meta:
        model = InventoryStoreItem
        fields = ['id', 'storeItem', 'boughtAt']
        read_only_fields = ['id', 'storeItem', 'boughtAt']
    
    def create(self, validated_data):
        return InventoryStoreItem.objects.create(**validated_data)
    
    
        


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
    plays = serializers.SerializerMethodField()

    class Meta:
        model = Quiz
        fields = ['id', 'created', 'rightWord', 'leftWord', 'leftPlayCount', 'rightPlayCount', 'plays']
        read_only_fields = ['id', 'created', 'rightWord', 'leftWord', 'leftPlayCount', 'rightPlayCount', 'plays']
    
    def get_plays(self, obj):
        plays = Play.objects.filter(quiz=obj)
        return plays.count()

class FeedbackSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = Feedback
        fields = '__all__'
        read_only_fields = ['id', 'created', 'author']