from .models import Skill,Profile,Chat,Message
from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'email'] 

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields= '__all__'
        read_only_fields=['id']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    skill_have_names=serializers.ListField(
        child=serializers.CharField(), write_only=True
        )
    skill_want_names=serializers.ListField(
        child=serializers.CharField(), write_only=True
    )

    skill_have=SkillSerializer(many=True,read_only=True)
    skill_want=SkillSerializer(many=True,read_only=True)

    class Meta:
        model=Profile
        fields=['id','user','bio','skill_have','skill_have_names','skill_want','skill_want_names']
        read_only_fields=['user']

    def create(self, validated_data):
        request = self.context.get('request')
        print("request",request)
        print(request.user)
        user=User.objects.get(username=request.user).id
        print(user)

        skill_have_names = validated_data.pop('skill_have_names', [])
        skill_want_names = validated_data.pop('skill_want_names', [])

        profile,_ = Profile.objects.get_or_create(**validated_data)

        for name in skill_have_names:
            skill, _ = Skill.objects.get_or_create(name=name)
            profile.skill_have.add(skill)

        for name in skill_want_names:
            skill, _ = Skill.objects.get_or_create(name=name)
            profile.skill_want.add(skill)

        return profile
