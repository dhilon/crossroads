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

    def to_internal_value(self, data):
        return {'bought': bool(data.get('bought'))}

    def create(self, validated_data):
        return StoreItem.objects.create(**validated_data)

    def update(self, instance, validated_data):
        StoreItem.save(self=instance)
        return StoreItem.objects.update(**validated_data)

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
        read_only_fields = ['id', 'created', 'myProfile', 'myQuiz', 'winSide', 'ended', 'win']

    def to_internal_value(self, data):
        return {'right': bool(data.get('right')), 'left': bool(data.get('left'))}

    def create(self, validated_data):
        return Play.objects.create(**validated_data)

    def update(self, instance, validated_data):
        Play.save(self=instance)
        return Play.objects.update(**validated_data)

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'
        read_only_fields = ['id', 'text', 'created', 'myProfile']