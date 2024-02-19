from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, schema, action
from rest_framework.response import Response


from api.models.livro import Livro
from api.serializers.livro import LivroSerializer
from config.schema import CustomSchema


class LivroController(viewsets.ModelViewSet):
    queryset = Livro.objects.all()
    serializer_class = LivroSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    @action(detail=True, methods=['GET'])
    def listar_livros(self, request):
        items = Livro.objects.all()
        serializer = LivroSerializer(items, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(method='get', manual_parameters=[openapi.Parameter(name='id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER),])
    @action(detail=True, methods=['GET'])
    def listar_livros_id(self, request):
        try:
            id = request.query_params.get('id')
            pk = int(id)
            item = Livro.objects.get(pk=pk)
        except Livro.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = LivroSerializer(item)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(method='get', manual_parameters=[
        openapi.Parameter(name='titulo', in_=openapi.IN_QUERY, type=openapi.TYPE_STRING)])
    @action(detail=True, methods=['GET'])
    def listar_livros_titulo(self, request):
        try:
            titulo = request.query_params.get('titulo')
            item = Livro.objects.get(titulo=titulo)
        except Livro.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = LivroSerializer(item)
        return Response(serializer.data, status=status.HTTP_200_OK)


    #@api_view(['POST'])
    @swagger_auto_schema(request_body=LivroSerializer)
    @action(detail=True, methods=['POST'])
    def salvar_livros(self, request):
        serializer = LivroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @swagger_auto_schema(method='put', manual_parameters=[openapi.Parameter(name='id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER),])
    @action(detail=True, methods=['PUT'])
    def atualizar_livros(self, request):
        try:
            id = request.query_params.get('id')
            pk = int(id)
            item = Livro.objects.get(pk=pk)
        except Livro.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = LivroSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @swagger_auto_schema(method='delete', manual_parameters=[openapi.Parameter(name='id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER),])
    @action(detail=True, methods=['DELETE'])
    def deletar_livros(self, request):
        try:
            id = request.query_params.get('id')
            pk = int(id)
            item = Livro.objects.get(pk=pk)
        except Livro.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        item.delete()
        return Response(status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=LivroSerializer)
    @action(detail=True, methods=['POST'])
    def enviar_notificacao(self, request):
        serializer = None#LivroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
