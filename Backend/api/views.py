from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response  
from rest_framework import status             
from .models import Skill, Profile, Chat, Message
from .serializers import SkillSerializer, ProfileSerializer, MessageSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Q


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

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def getProfile(request, id):
    try:
        profile = Profile.objects.get(id=id)
    except Profile.DoesNotExist:
        return Response({"error": "Profile not found"}, status=404)

    serializer = ProfileSerializer(profile)
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def getProfile2(request, id):
    try:
        profile = Profile.objects.get(user=id)
    except Profile.DoesNotExist:
        return Response({"error": "Profile not found"}, status=404)

    serializer = ProfileSerializer(profile)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chat(request):
    user1 = request.user
    user2_id = request.data.get('userId')
    print(user2_id)

    if not user2_id:
        return Response({"error": "userId is required"}, status=status.HTTP_400_BAD_REQUEST)

    if str(user1.id) == str(user2_id):
        return Response({"error": "Cannot create chat with yourself"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user2 = User.objects.get(id=user2_id)

        # ✅ Check using ID fields
        chat = Chat.objects.filter(
            (Q(person1=user1.id) & Q(person2=user2.id)) |
            (Q(person1=user2.id) & Q(person2=user1.id))
        ).first()
          
        print(chat)

        if not chat:
            chat = Chat.objects.create(person1=user1, person2=user2)

        return Response({
            "chat_id": chat.id,
            "person1": chat.person1.username,
            "person2": chat.person2.username
        }, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def getMessages(request, id):
    messages = Message.objects.filter(chatRoom=id)
    if not messages.exists():
        return Response({"error": "No messages found"}, status=404)
    
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def sendMessage(request):
    serializer = MessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(sender=request.user)
        return Response({"success": True, "data": serializer.data}, status=status.HTTP_201_CREATED)
    
    print("Errors:", serializer.errors)
    return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)