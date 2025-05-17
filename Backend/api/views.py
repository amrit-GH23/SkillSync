from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response  
from rest_framework import status             
from .models import Skill, Profile
from .serializers import SkillSerializer, ProfileSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
def signup(request):
    name = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    # Create the user
    user = User.objects.create_user(
        username=email,  # Using email as username
        password=password,
        email=email,
        first_name=name
    )

    # Generate tokens for the user
    refresh = RefreshToken.for_user(user)

    return Response({
        'message': 'Signup successful',
        'access': str(refresh.access_token),
        'refresh': str(refresh)
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def createProfile(request):
    print("Payload received:", request.data,request.user)  # 👈 add this
    serializer = ProfileSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    print("Errors:", serializer.errors)  # 👈 add this
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


def find_matches_for(profile):
    # Get skill sets
    my_have = profile.skill_have.all()
    my_want = profile.skill_want.all()

    # Find other profiles where:
    # They have what I want AND want what I have
    matches = Profile.objects.exclude(id=profile.id).filter(
        skill_have__in=my_want,
        skill_want__in=my_have
    ).distinct()

    return matches

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get(request):
    try:
        print(request.user)
        profile = Profile.objects.get(user=request.user.id)
        print(profile)
    except Profile.DoesNotExist:
        return Response({"error": "Profile not found"}, status=404)
    matches = find_matches_for(profile)
    serializer = ProfileSerializer(matches, many=True)
    return Response(serializer.data)
