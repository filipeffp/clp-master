from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, schema, action
from rest_framework.response import Response


from api.models.colecao import ColecaoPessoal
from api.serializers.colecao import ColecaoSerializer, ColecaoNovoSerializer
from config.schema import CustomSchema


class ColecaoController(viewsets.ModelViewSet):
    queryset = ColecaoPessoal.objects.all()
    serializer_class = ColecaoSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    @action(detail=True, methods=['GET'])
    def listar_colecoes(self, request):
        items = ColecaoPessoal.objects.all()
        serializer = ColecaoSerializer(items, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(method='get', manual_parameters=[openapi.Parameter(name='id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER),])
    @action(detail=True, methods=['GET'])
    def listar_colecoes_id(self, request):
        try:
            id = request.query_params.get('id')
            pk = int(id)
            item = ColecaoPessoal.objects.get(pk=pk)
        except ColecaoPessoal.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ColecaoSerializer(item)
        return Response(serializer.data, status=status.HTTP_200_OK)


    #@api_view(['POST'])
    @swagger_auto_schema(request_body=ColecaoSerializer)
    @action(detail=True, methods=['POST'])
    def salvar_colecoes(self, request):
        serializer = ColecaoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #@swagger_auto_schema(request_body=ColecaoSerializer)
    # @swagger_auto_schema(method='put', manual_parameters=[
    #     openapi.Parameter(name='usuario_id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER)],
    #                      request_body=ColecaoSerializer)
    # @action(detail=True, methods=['put'])
    # def salvar_item_colecoes(self, request):
    #     usuario_id = request.query_params.get('usuario_id')
    #     item = ColecaoPessoal.objects.get(usuario_id=usuario_id)
    #     serializer = ColecaoSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(method='put', manual_parameters=[openapi.Parameter(name='id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER),])
    @action(detail=True, methods=['PUT'])
    def atualizar_colecoes(self, request):
        try:
            id = request.query_params.get('id')
            pk = int(id)
            item = ColecaoPessoal.objects.get(pk=pk)
        except ColecaoPessoal.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ColecaoSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(method='put', request_body=ColecaoNovoSerializer)
    @action(detail=True, methods=['PUT'])
    def salvar_item_colecoes(self, request):
        try:
            usuario_id = request.data.get('usuario_id')
            item = ColecaoPessoal.objects.get(usuario_id=usuario_id)
        except ColecaoPessoal.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Adicione o novo livro à lista de livros
        novo_livro = request.data.get('livro_id')  # Supondo que o novo livro seja enviado nos dados da requisição
        if novo_livro:
            item.livros.add(novo_livro)

        serializer = ColecaoSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_200_OK)


    @swagger_auto_schema(method='delete', manual_parameters=[openapi.Parameter(name='id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER),])
    @action(detail=True, methods=['DELETE'])
    def deletar_colecoes(self, request):
        try:
            id = request.query_params.get('id')
            pk = int(id)
            item = ColecaoPessoal.objects.get(pk=pk)
        except ColecaoPessoal.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        item.delete()
        return Response(status=status.HTTP_200_OK)


    @swagger_auto_schema(method='put', request_body=ColecaoNovoSerializer)
    @action(detail=True, methods=['PUT'])
    def deletar_item_colecoes(self, request):
        try:
            usuario_id = request.data.get('usuario_id')
            item = ColecaoPessoal.objects.get(usuario_id=usuario_id)
        except ColecaoPessoal.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Remova o livro da lista de livros
        livro_remover = request.data.get(
            'livro_id')  # Supondo que o livro a ser removido seja enviado nos dados da requisição
        if livro_remover:
            item.livros.remove(livro_remover)

        serializer = ColecaoSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_200_OK)
