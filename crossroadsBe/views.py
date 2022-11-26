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

class FactList(generics.ListAPIView):
    queryset = Fact.objects.all()
    serializer_class = FactSerializer

class FactDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Fact.objects.all()
    serializer_class = FactSerializer

class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class StoreItemList(generics.ListAPIView):
    queryset = StoreItem.objects.all()
    serializer_class = StoreItemSerializer

class StoreItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = StoreItem.objects.all()
    serializer_class = StoreItemSerializer

class PlayList(generics.ListCreateAPIView):
    serializer_class = PlaySerializer
    
    def get_queryset(self):
        return Play.objects.filter(quiz=self.kwargs[self.lookup_field])

    def perform_create(self, serializer):
        serializer.save(
            quiz=Quiz.objects.get(pk=self.kwargs[self.lookup_field]),
            player=self.request.user
            )

class PlayDetail(generics.RetrieveUpdateAPIView):
    serializer_class = PlaySerializer

    def get_queryset(self):
        return Play.objects.filter(pk=self.kwargs['pk2'])

    def get_object(self):
        return Play.objects.get(pk=self.kwargs['pk2']) 

class InventoryList(generics.ListAPIView):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

class InventoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

class InventoryStorItemList(generics.ListAPIView):
    queryset = InventoryStoreItem.objects.all()
    serializer_class = InventoryStoreItemSerializer

class InventoryStoreItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = InventoryStoreItem.objects.all()
    serializer_class = InventoryStoreItemSerializer


class QuizList(generics.ListAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class QuizDetail(generics.RetrieveAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class FeedbackList(generics.ListAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

class FeedbackDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer