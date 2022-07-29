from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from .models import Profile, StoreItem, Inventory, Quiz, Plays, Feedback, Facts

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def vote(request, question_id):
    return HttpResponse("You're voting on quiz %s." % question_id)

def calendar(request):
    latest_question_list = Plays.objects.order_by('created')[:5]
    output = ', '.join([q.created.__str__() for q in latest_question_list])
    return HttpResponse("All quizzes: " + output)