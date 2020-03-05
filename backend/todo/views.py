from rest_framework import viewsets

from .serializers import TodoSerializer
from .models import Todo

# TodoView API
class TodoView(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
