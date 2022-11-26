from rest_framework import serializers
from crossroadsBe.models import Fact, InventoryStoreItem, Profile, StoreItem, Inventory, Quiz, Play, Feedback


class FactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fact
        fields = '__all__'
        read_only_fields = ['id', 'title']

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(read_only=True, slug_field='username')

    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ['id', 'created', 'streak', 'user', 'points', 'hoursPlayed', 'hoursWon', 'accountId', 'highestStreak', 'highestPoints']


class StoreItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreItem
        fields = '__all__'
        read_only_fields = ['id', 'pointsCost', 'name', 'powerLevel', 'createdAt']


class InventorySerializer(serializers.ModelSerializer):
    items = serializers.PrimaryKeyRelatedField(many=True, queryset=InventoryStoreItem.objects.all())

    class Meta:
        model = Inventory
        fields = '__all__'
        read_only_fields = ['id', 'profile']
    

class InventoryStoreItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryStoreItem
        fields = '_all_'
        read_only_fields = ['id', 'inventory', 'storeItem', 'boughtAt']
        

class QuizSerializer(serializers.ModelSerializer):
    plays = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = '__all__'
        read_only_fields = ['id', 'created', 'rightWord', 'leftWord', 'ended']

class PlaySerializer(serializers.ModelSerializer):
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

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'
        read_only_fields = ['id', 'text', 'created', 'author']