from django.urls import path, include
from rest_framework.routers import DefaultRouter 

from .views import UserViewSet

app_name = 'user_api'

router = DefaultRouter()
router.register(r'', UserViewSet, basename='user')

urlpatterns = [
    # path('me', RetrieveUserView.as_view())
    path('', include(router.urls))
]