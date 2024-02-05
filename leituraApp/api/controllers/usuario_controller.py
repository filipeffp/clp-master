from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, schema, action
from rest_framework.response import Response
from api.models.usuario import Usuario
from api.serializers.usuario import UsuarioSerializer
from config.schema import CustomSchema


class UsuarioController(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    @swagger_auto_schema(request_body=UsuarioSerializer)
    @action(detail=False, methods=['post'])
    def create_task(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)