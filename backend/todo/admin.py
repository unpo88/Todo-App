from django.contrib import admin

from .models import Todo

class TodoAdmin(admin.ModelAdmin):
    list_display = ('content', 'completed', 'completed_at', 'owner')

# Register your models here.
admin.site.register(Todo, TodoAdmin)