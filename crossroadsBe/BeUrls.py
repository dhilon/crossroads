from django.urls import include, path, register_converter
from django.contrib import admin
from . import views
from crossroadsBe.converters import DateConverter
from django.conf import settings
from django.conf.urls.static import static

register_converter(DateConverter, 'date')

urlpatterns = [
    path('', views.index, name='index'),
    path('feedbacks/', views.FeedbackList.as_view()),
    path('fact/', views.FactDetail.as_view()),
    path('profile/', views.ProfileDetail.as_view()),
    path('storeItems/', views.StoreItemList.as_view()),
    path('storeItems/<int:pk>/', views.StoreItemDetail.as_view()),
    path('inventoryStoreItems/', views.InventoryStoreItemList.as_view()),
    path('inventoryStoreItems/<int:pk>/', views.InventoryStoreItemDetail.as_view()),
    path('quizzes/', views.QuizDetail.as_view()),
    path('quizzes/<date:date>/', views.QuizDetail.as_view()),
    path('quizzes/plays/', views.PlayList.as_view()),
    path('quizzes/plays/<date:date>/', views.PlayList.as_view()),
    path('quizzes/plays/<date:date>/<int:pk2>/', views.PlayDetail.as_view()),
    path('streakLeaderboard/', views.StreakLeaderboard.as_view()),
    path('pointsLeaderboard/', views.PointsLeaderboard.as_view()),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)