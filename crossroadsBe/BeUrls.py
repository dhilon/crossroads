from django.urls import include, path
from django.contrib import admin
from . import views

urlpatterns = [
    path('crossroadsbe/', views.index, name='index'),
    path('', views.index, name='index0'),
]