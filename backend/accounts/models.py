from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, **kwargs):
        if not kwargs['user_id']:
            raise ValueError('Users must have an user_id')

        user = self.model(
            user_id=kwargs['user_id'],
            user_name=kwargs['user_name'],
        )

        user.set_password(kwargs['password'])
        user.save(using=self._db)
        return user

    def create_superuser(self, user_id, password):
        user = self.create_user(
            user_id,
            password=password
        )

        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    user_id = models.EmailField(max_length=255, unique=True)
    user_name = models.CharField(max_length=50, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'user_id'
    REQUIRED_FIELDS = ['user_name']

    class Meta:
        db_table = 'account'

    def __str__(self):
        return self.user_id

