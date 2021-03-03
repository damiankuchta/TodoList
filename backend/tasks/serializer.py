from rest_framework import serializers

from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    to_be_completed_date = serializers.DateField(allow_null=True)

    class Meta:
        model = Task
        fields = '__all__'


