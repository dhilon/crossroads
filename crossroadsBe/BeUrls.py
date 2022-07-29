from django.urls import include, path
from django.contrib import admin
from . import views

urlpatterns = [
    path('crossroadsbe/', views.index, name='index'),
    path('<int:question_id>/', views.vote, name='vote'),
    path('calendar/', views.calendar, name='plays'),
]