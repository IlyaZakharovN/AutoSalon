from django.urls import path, include
from rest_framework.routers import DefaultRouter 

from .views import TestDriveViewSet, TestDriveStatusViewSet

app_name = 'testdrive_api'

router = DefaultRouter()
router.register(r'testdrive', TestDriveViewSet, basename='testdrive')
router.register(r'testdrive-status', TestDriveStatusViewSet, basename='testdrive-status')

urlpatterns = [
    path('', include(router.urls))
]