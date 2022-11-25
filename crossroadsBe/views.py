from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from crossroadsBe.serializer import *
from rest_framework import generics

# Create your views here.

from django.http import HttpResponse
from .models import Profile, StoreItem, Inventory, Quiz, Play, Feedback, Fact

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def vote(request, question_id):
    return HttpResponse("You're voting on quiz %s." % question_id)

def calendar(request):
    latest_question_list = Play.objects.order_by('created')[:5]
    output = ', '.join([q.created.__str__() for q in latest_question_list])
    return HttpResponse("All quizzes: " + output)

class FactList(generics.ListCreateAPIView):
    queryset = Fact.objects.all()
    serializer_class = FactSerializer

class FactDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Fact.objects.all()
    serializer_class = FactSerializer

class ProfileList(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class StoreItemList(generics.ListCreateAPIView):
    queryset = StoreItem.objects.all()
    serializer_class = StoreItemSerializer

class StoreItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = StoreItem.objects.all()
    serializer_class = StoreItemSerializer

class PlayList(generics.ListCreateAPIView):
    queryset = Play.objects.all()
    serializer_class = PlaySerializer

class PlayDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Play.objects.all()
    serializer_class = PlaySerializer

class InventoryList(generics.ListCreateAPIView):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

class InventoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

class QuizList(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class QuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class FeedbackList(generics.ListCreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

class FeedbackDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer