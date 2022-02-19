from django.contrib.auth import get_user_model
User = get_user_model()
from django.shortcuts import render

from rest_framework import status
from rest_framework.permissions import BasePermission
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from .serializers import UserSerializer
from .models import UserAccount

# Create your views here.

class CustomPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.is_authenticated
        elif view.action in ['create', 'update', 'partial_update', 'destroy']:
            return (request.user.is_authenticated and (request.user.is_superuser)) # may turn out to be broken

class UserViewSet(ModelViewSet):
    queryset = UserAccount.objects.all()
    serializer_class = UserSerializer
    permission_classes = (CustomPermission,)

    # def list(self, request):
    #     serializer_class = UserSerializer
    #     queryset = self.request.user
    #     # return Response(UserSerializer(request.user).data)

    #     try:
    #         user = UserSerializer(request.user)
    #         return Response(user.data)
    #     except:
    #         return Response("no data")