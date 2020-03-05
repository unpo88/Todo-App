from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    user_id = models.EmailField(max_length=100, unique=True)    # ID(Email 주소 형태)
    user_name = models.CharField(max_length=100)                # 이름
    created_at = models.DateTimeField(auto_now_add=True)        # 가입일

    class Meta:
        db_table = 'account'

    def __str__(self):
        return self.user_id

