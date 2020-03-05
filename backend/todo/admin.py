from django.contrib import admin

from .models import Todo

class TodoAdmin(admin.ModelAdmin):
    list_display = ('name', 'content', 'completed', 'completed_at')


# Register your models here.
admin.site.register(Todo, TodoAdmin)