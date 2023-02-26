from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from crossroadsBe.serializer import *
from rest_framework import generics
from datetime import datetime
import random

# Create your views here.

from django.http import HttpResponse
from .models import Profile, StoreItem, Quiz, Play, Feedback, Fact

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def vote(request, question_id):
    return HttpResponse("You're voting on quiz %s." % question_id)

def getDate(kwargs):
    if 'date' not in kwargs:
        date = datetime.now()
    else:
        date = kwargs['date']
    return date


def calendar(request):
    latest_question_list = Play.objects.order_by('created')[:5]
    output = ', '.join([q.created.__str__() for q in latest_question_list])
    return HttpResponse("All quizzes: " + output)

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



class StoreItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = StoreItem.objects.all()
    serializer_class = StoreItemSerializer

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

class InventoryStoreItemList(generics.ListAPIView):
    serializer_class = InventoryStoreItemSerializer
    def get_queryset(self):
        inventory = Inventory.objects.get(user=self.request.user)
        return InventoryStoreItem.objects.filter(inventory=inventory)

class InventoryStoreItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = InventoryStoreItem.objects.all()
    serializer_class = InventoryStoreItemSerializer


class QuizDetail(generics.RetrieveAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context

    def get_object(self):
        date = getDate(self.kwargs)
        return Quiz.getFromDate(date);

class FeedbackList(generics.ListCreateAPIView):
    def perform_create(self, serializer):
        serializer.save(
            author=self.request.user
            )
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer