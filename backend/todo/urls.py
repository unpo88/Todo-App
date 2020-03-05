from rest_framework import routers
from .views import TodoView

router = routers.DefaultRouter()
router.register('api/todo', TodoView, 'TodoView')

urlpatterns = router.urls
