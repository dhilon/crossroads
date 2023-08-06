import os
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from django.views import View
from crossroadsBe.serializer import *
from rest_framework import generics
from datetime import datetime
import random
from .models import Profile, StoreItem, Quiz, Play, Feedback, Fact
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache

# Create your views here.
index = never_cache(TemplateView.as_view(template_name='index.html'))

def getDate(kwargs):
    if 'date' not in kwargs:
        date = datetime.now()
    else:
        date = kwargs['date']
    return date

def getNotToday(kwargs):
    if 'date' in kwargs and datetime.now() != kwargs['date']:
        return kwargs['date']

class FactDetail(generics.RetrieveAPIView):
    queryset = Fact.objects.all()
    serializer_class = FactSerializer
    
    def get_object(self):
        objs = Fact.objects.order_by('?')
        if len(objs) == 0:
            return Fact(title = "This is a bug.")
        return objs[0]

class ProfileDetail(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def get_object(self):
        obj = Profile.objects.get(user=self.request.user)
        return obj


class StreakLeaderboard(generics.ListAPIView):
    serializer_class = ProfileSerializer
    def get_queryset(self):
        return Profile.objects.order_by('-streak')[:3]
    
    
class PointsLeaderboard(generics.ListAPIView):
    serializer_class = ProfileSerializer
    def get_queryset(self):
        return Profile.objects.order_by('-points')[:3]
    

class StoreItemList(generics.ListAPIView):
    serializer_class = StoreItemSerializer
    
    def get_queryset(self):
        objs = StoreItem.objects.order_by("?")
        return objs[:3]
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context



class StoreItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = StoreItem.objects.all()
    serializer_class = StoreItemSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context

class PlayList(generics.ListCreateAPIView):
    serializer_class = PlaySerializer
    
    def get_queryset(self):
        quiz = Quiz.getFromDate(getDate(self.kwargs));
        return Play.objects.filter(quiz = quiz, player=self.request.user)

    def perform_create(self, serializer):
        serializer.save(
            quiz=Quiz.getFromDate(getDate(self.kwargs)),
            player=self.request.user
            )

class PlayDetail(generics.RetrieveUpdateAPIView):
    serializer_class = PlaySerializer

    def get_queryset(self):
        quiz = Quiz.getFromDate(getDate(self.kwargs));
        return Play.objects.filter(quiz = quiz, player=self.request.user)

    def get_object(self):
        return Play.objects.get(pk=self.kwargs['pk2']) 

class InventoryStoreItemList(generics.ListCreateAPIView):
    serializer_class = InventoryStoreItemSerializer
    def get_queryset(self):
        inventory = Inventory.objects.get(user=self.request.user)
        return InventoryStoreItem.objects.filter(inventory=inventory)
    
    def perform_create(self, serializer):
        inventory = Inventory.objects.get(user=self.request.user)
        storeItem = StoreItem.objects.get(pk=self.request.data['storeItemId'])
        
        serializer.save(
            inventory=inventory,
            storeItem=storeItem
            )
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context

class InventoryStoreItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = InventoryStoreItem.objects.all()
    serializer_class = InventoryStoreItemSerializer

    
    def perform_destroy(self, instance):
        return super().perform_destroy(instance)
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context


class QuizDetail(generics.RetrieveUpdateAPIView):
    
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()
    
    def get_object(self):
        return Quiz.getFromDate(getDate(self.kwargs));

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context

class QuizList(generics.ListCreateAPIView):
    
    serializer_class = QuizSerializer
    
    def get_queryset(self):
        return Quiz.objects.all();
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context

class FeedbackList(generics.ListCreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

    def perform_create(self, serializer):
        serializer.save(
            author=self.request.user
            )
        
        
class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()