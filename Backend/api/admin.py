# admin.py

from django.contrib import admin
from .models import Profile, Skill, Chat, Message

admin.site.register(Profile)
admin.site.register(Skill)
admin.site.register(Chat)
admin.site.register(Message)
