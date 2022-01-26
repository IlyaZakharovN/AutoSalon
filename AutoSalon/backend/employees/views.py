from django.contrib.auth import get_user_model
User = get_user_model()
from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from .serializers import UserSerializer
from .models import UserAccount

# Create your views here.

class UserViewSet(ModelViewSet):
    """
    A viewset for viewing instances.
    """
    queryset = UserAccount.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        serializer_class = UserSerializer
        queryset = self.request.user
        # return Response(UserSerializer(request.user).data)

        try:
            user = UserSerializer(request.user)
            return Response(user.data)
        except:
            return Response("no data")
        
# class RetrieveUserView(APIView):
#     queryset = UserAccount.objects.all()
#     serializer_class = UserSerializer

#     @classmethod
#     def get_extra_actions(cls):
#         return []

#     def get(self, request, format=None):
#         user = self.request.user
#         user = UserSerializer(user)
#         return (
#                 user.id,
#                 {'user': user.data},
#             )
        # try:
        #     user = self.request.user
        #     user = UserSerializer(user)
            
        #     return Response(
        #         {'user': user.data},
        #         status=status.HTTP_200_OK
        #     )
        # except:
        #     return Response(
        #         {'error': 'Something went wrong when retrieving an user details.'},
        #         status=status.HTTP_500_INTERNAL_SERVER_ERROR
        #     )