from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response  
from rest_framework import status             
from .models import Skill, Profile
from .serializers import SkillSerializer, ProfileSerializer


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
    serializer=ProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)