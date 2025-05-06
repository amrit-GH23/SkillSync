from django.urls import path
from . import views

urlpatterns = [
    path('getSkill/', views.getskill, name='skill'),
    path('getSkill1/<int:pk>/', views.getskill1, name='skill1'),
    path('setSkill/', views.setskill, name='Sskill'),
    path('setSkill1/<int:pk>/', views.setskill1, name='Sskill1'),
    path('createProfile', views.createProfile, name='cProfile'),
]
