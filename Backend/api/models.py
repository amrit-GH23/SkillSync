from django.db import models
from django.contrib.auth.models import User

class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bio = models.CharField(max_length=1000, blank=True)
    skill_have = models.ManyToManyField(Skill, related_name='profiles_with_skill')
    skill_want = models.ManyToManyField(Skill, related_name='profiles_wanting_skill')

    def __str__(self):
        return self.user.username

class Chat(models.Model):
    person1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chats_as_person1')
    person2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chats_as_person2')

    def __str__(self):
        return f"Chat between {self.person1.username} and {self.person2.username}"

class Message(models.Model):
    chatRoom = models.ForeignKey(Chat, on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    message = models.TextField(max_length=10000)
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"From {self.sender.username} to {self.receiver.username} at {self.time}"
