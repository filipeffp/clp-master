from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.models.colecao import ColecaoPessoal
from api.serializers.colecao import ColecaoSerializer


@api_view(['GET'])
def colecao_get(request):
    items = ColecaoPessoal.objects.all()
    serializer = ColecaoSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def colecao_post(request):
    serializer = ColecaoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def colecao_get_id(request, pk):
    try:
        item = ColecaoPessoal.objects.get(pk=pk)
    except ColecaoPessoal.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ColecaoSerializer(item)
    return Response(serializer.data)


@api_view(['PUT'])
def colecao_put(request, pk):
    try:
        item = ColecaoPessoal.objects.get(pk=pk)
    except ColecaoPessoal.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ColecaoSerializer(item, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def colecao_delete(request, pk):
    try:
        item = ColecaoPessoal.objects.get(pk=pk)
    except ColecaoPessoal.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
