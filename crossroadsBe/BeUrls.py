from django.urls import include, path
from django.contrib import admin
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:question_id>/', views.vote, name='vote'),
    path('calendar/', views.calendar, name='play'),
    path('feedbacks/', views.FeedbackList.as_view()),
    path('feedbacks/<int:pk>/', views.FeedbackDetail.as_view()),
    path('fact/', views.FactDetail.as_view()),
    path('profile/', views.ProfileDetail.as_view()),
    path('storeItems/', views.StoreItemList.as_view()),
    path('storeItems/<int:pk>/', views.StoreItemDetail.as_view()),
    path('inventoryStoreItems/', views.InventoryStoreItemList.as_view()),
    path('inventoryStoreItems/<int:pk>/', views.InventoryStoreItemDetail.as_view()),
    path('quizzes/', views.QuizList.as_view()),
    path('quizzes/<int:pk>/', views.QuizDetail.as_view()),
    path('quizzes/<int:pk>/plays', views.PlayList.as_view()),
    path('quizzes/<int:pk>/plays/<int:pk2>/', views.PlayDetail.as_view()),
]