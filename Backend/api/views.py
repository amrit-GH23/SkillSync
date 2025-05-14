from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response  
from rest_framework import status             
from .models import Skill, Profile
from .serializers import SkillSerializer, ProfileSerializer
from django.contrib.auth.models import User

@api_view(['POST'])
def signup(request):
    name = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create_user(username=email, password=password, email=email, first_name=name)
    return Response({'message': 'Signup successful'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def getskill(request):
    skills = Skill.objects.all()
    serializer = SkillSerializer(skills, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getskill1(request, pk):
    try:
        skill = Skill.objects.get(id=pk)
    except Skill.DoesNotExist:
        return Response({'error': 'Skill not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = SkillSerializer(skill)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def setskill(request):
    serializer = SkillSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def setskill1(request,pk):
    try:
        skill=Skill.objects.get(id=pk)
        serializer = SkillSerializer(skill,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    except Skill.DoesNotExist:
        return Response({'error': 'Skill not found'}, status=status.HTTP_404_NOT_FOUND)

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
