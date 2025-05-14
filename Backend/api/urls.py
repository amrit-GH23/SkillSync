from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

urlpatterns = [
    path('getSkill/', views.getskill, name='skill'),
    path('getSkill1/<int:pk>/', views.getskill1, name='skill1'),
    path('setSkill/', views.setskill, name='Sskill'),
    path('setSkill1/<int:pk>/', views.setskill1, name='Sskill1'),
    path('createProfile/', views.createProfile, name='cProfile'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', views.signup, name='signup'),
    path('getProfile/', views.get, name='profile'),
]
