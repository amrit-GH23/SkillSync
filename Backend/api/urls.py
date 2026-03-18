from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

urlpatterns = [
    path('createProfile/', views.createProfile, name='cProfile'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', views.signup, name='signup'),
    path('getProfile/', views.get, name='profile'),
    path('getProfile/<int:id>/', views.getProfile, name='profile'),
    path('getProfile2/<int:id>/', views.getProfile2, name='profile2'),
    path('sendMessage/', views.sendMessage, name='sendMessage'),
    path('getMessages/<int:id>/', views.getMessages, name='getMessages'),
    path('chat/', views.chat, name='chat'),
]
