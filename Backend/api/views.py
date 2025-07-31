from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response  
from rest_framework import status             
from .models import Skill, Profile
from .serializers import SkillSerializer, ProfileSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
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
@permission_classes([IsAuthenticated])
def createProfile(request):
    print("Payload received:", request.data,request.user)  # 👈 add this
    serializer = ProfileSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    print("Errors:", serializer.errors)  # 👈 add this
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


def find_matches_for(profile):
    from collections import defaultdict

    my_have = set(profile.skill_have.all())
    my_want = set(profile.skill_want.all())

    other_profiles = Profile.objects.exclude(id=profile.id).prefetch_related('skill_have', 'skill_want')

    scored_matches = []

    for other in other_profiles:
        their_have = set(other.skill_have.all())
        their_want = set(other.skill_want.all())

        # Skills they have that you want
        overlap_have = their_have & my_want

        # Skills they want that you have
        overlap_want = their_want & my_have

        # Scoring logic: you can adjust weights here
        score = len(overlap_have) + len(overlap_want)

        if score > 0:
            scored_matches.append((score, other))

    # Sort by score descending
    scored_matches.sort(key=lambda x: x[0], reverse=True)

    # Optional: return just the profiles or profiles with score
    return [match[1] for match in scored_matches]


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

# @permission_classes([IsAuthenticated])
@api_view(['GET'])
def getProfile(request, id):
    try:
        profile = Profile.objects.get(id=id)
    except Profile.DoesNotExist:
        return Response({"error": "Profile not found"}, status=404)

    serializer = ProfileSerializer(profile)
    return Response(serializer.data)