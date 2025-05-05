from .models import Skill,Profile,Chat,Message
from rest_framework import serializers

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields= '__all__'
        read_only_fields=['id']