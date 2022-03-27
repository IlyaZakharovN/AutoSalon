from django.db import router
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import TechInspectionViewSet, TechInspectionRequesViewSet, DownloadPDF

app_name = 'tech_inspection_api'

router = DefaultRouter()
router.register(r'tech-inspections', TechInspectionViewSet, basename='tech-inspections')
router.register(r'requests', TechInspectionRequesViewSet, basename='tech-inspections-request')

urlpatterns = [
    path('', include(router.urls)),
    # path('download/', DownloadPDF, name='download_pdf'),
]

# urlpatterns += path('download/', DownloadPDF, name='download_pdf'),