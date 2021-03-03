from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from tasks.serializer import TaskSerializer
from tasks.models import Task
# Create your views here.


@method_decorator(csrf_exempt, name="dispatch")
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

    # todo : check data on POST
