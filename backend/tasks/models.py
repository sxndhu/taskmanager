from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('completed', 'Completed')
    )

    user = models.ForeignKey(User, on_delete = models.CASCADE)
    title = models.CharField(max_length = 200)
    description = models.TextField(blank = True, null = True)
    status = models.CharField(max_length = 20, choices = STATUS_CHOICES, default = 'pending')
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(Self):
        return self.title

