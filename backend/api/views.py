from datetime import date

from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from tasks.serializer import TaskSerializer
from tasks.models import Task
# Create your views here.


@method_decorator(csrf_exempt, name="dispatch")
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.all()
        is_completed = self.request.GET.get("is_completed", None)

        if is_completed == "true":
            queryset = queryset.filter(is_completed=True)
        elif is_completed == "false":
            queryset = queryset.filter(is_completed=False)

        return queryset

    def update(self, request, *args, **kwargs):
        if request.data['is_completed']:
            request.data['completed_date'] = date.today()
        else:
            request.data['completed_date'] = None
        return super().update(request, *args, **kwargs)

