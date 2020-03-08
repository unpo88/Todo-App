from django.db import models
from accounts.models import User

# Create your models here.
class Todo(models.Model):
    content = models.TextField()                  # TO_DO 내용
    completed = models.BooleanField(default=False)          # 완료 여부
    completed_at = models.DateTimeField(auto_now=True)  # 가장 최근 업데이트 시간
    owner = models.ForeignKey(
        User, related_name="todos",
        on_delete=models.CASCADE, null=True
    )
    class Meta:
        db_table = 'todo_info'

    def __str__(self):
        return self.content

