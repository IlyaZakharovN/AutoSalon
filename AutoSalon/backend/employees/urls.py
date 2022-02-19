from django.urls import path, include
from rest_framework.routers import DefaultRouter 

from .views import UserViewSet, UserRetrieveUpdateAPIView

app_name = 'user_api'

router = DefaultRouter()
router.register(r'', UserViewSet, basename='users')
# router.register(r'user', UserRetrieveUpdateAPIView.as_view(), basename='user')

urlpatterns = [
    # path('me', RetrieveUserView.as_view())
    path('', include(router.urls))
]

urlpatterns += path('current-user', UserRetrieveUpdateAPIView.as_view()),