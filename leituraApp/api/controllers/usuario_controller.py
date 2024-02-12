from drf_yasg import openapi
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
    http_method_names = ['get', 'post', 'put', 'delete']

    @action(detail=True, methods=['GET'])
    def listar_usuarios(self, request):
        items = Usuario.objects.all()
        serializer = UsuarioSerializer(items, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(method='get', manual_parameters=[openapi.Parameter(name='id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER),])
    @action(detail=True, methods=['GET'])
    def listar_usuarios_id(self, request):
        try:
            id = request.query_params.get('id')
            pk = int(id)
            item = Usuario.objects.get(pk=pk)
        except Usuario.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = UsuarioSerializer(item)
        return Response(serializer.data, status=status.HTTP_200_OK)


    #@api_view(['POST'])
    @swagger_auto_schema(request_body=UsuarioSerializer)
    @action(detail=True, methods=['POST'])
    def salvar_usuarios(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @swagger_auto_schema(method='put', manual_parameters=[openapi.Parameter(name='id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER),])
    @action(detail=True, methods=['PUT'])
    def atualizar_usuarios(self, request):
        try:
            id = request.query_params.get('id')
            pk = int(id)
            item = Usuario.objects.get(pk=pk)
        except Usuario.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = UsuarioSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @swagger_auto_schema(method='delete', manual_parameters=[openapi.Parameter(name='id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER),])
    @action(detail=True, methods=['DELETE'])
    def deletar_usuarios(self, request):
        try:
            id = request.query_params.get('id')
            pk = int(id)
            item = Usuario.objects.get(pk=pk)
        except Usuario.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        item.delete()
        return Response(status=status.HTTP_200_OK)
