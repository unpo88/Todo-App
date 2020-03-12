from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, user_id, user_name, password=None):
        if not user_id:
            raise ValueError('Users must have an user_id')

        user = self.model(
            user_id=self.normalize_email(user_id),
            user_name=user_name
        )

        user.set_password(password)
        user.save(using=self._db)
        return user


    def create_superuser(self, user_id, user_name, password=None):
        user = self.create_user(
            user_id,
            user_name,
            password=password
        )

        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    user_id = models.EmailField(max_length=255, unique=True)    # ID(Email 주소 형태)
    user_name = models.CharField(max_length=50, default='')     # 이름
    created_at = models.DateTimeField(auto_now_add=True)        # 가입 일시
    is_admin = models.BooleanField(default=False)               # admin 권한

    objects = UserManager()

    USERNAME_FIELD = 'user_id'
    REQUIRED_FIELDS = ['user_name']

    class Meta:
        db_table = 'account'

    def __str__(self):
        return self.user_id

    @property
    def is_staff(self):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin

    def has_perm(self, perm, obj=None):
        return self.is_admin