from django.db import models

# Create your models here.
class Todo(models.Model):
    name = models.CharField(max_length=100)                 # 소유자
    content = models.TextField(blank=True)                  # TO_DO 내용
    completed = models.BooleanField(default=False)          # 완료 여부
    completed_at = models.DateTimeField(auto_now_add=True)  # 가장 최근 업데이트 시간

    class Meta:
        db_table = 'todo_info'

    def __str__(self):
        return self.content

