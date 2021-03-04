from django.db import models
from django.conf import settings


# Create your models here.
class Task(models.Model):
    name = models.CharField(max_length=getattr(settings,'TASK_MAX_CHAR_LENGTH' ))
    is_completed = models.BooleanField(default=False)
    completed_date = models.DateField(null=True)
    to_be_completed_date = models.DateField(blank=True, null=True)
    creation_date = models.DateField(auto_now_add=True)
    last_update_date = models.DateField(auto_now=True)