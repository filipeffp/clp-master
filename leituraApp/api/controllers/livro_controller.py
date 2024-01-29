from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.models.livro import Livro
from api.serializers.livro import LivroSerializer


@api_view(['GET'])
def livro_get(request):
    items = Livro.objects.all()
    serializer = LivroSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def livro_post(request):
    serializer = LivroSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def livro_get_id(request, pk):
    try:
        item = Livro.objects.get(pk=pk)
    except Livro.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = LivroSerializer(item)
    return Response(serializer.data)


@api_view(['PUT'])
def livro_put(request, pk):
    try:
        item = Livro.objects.get(pk=pk)
    except Livro.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = LivroSerializer(item, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def livro_delete(request, pk):
    try:
        item = Livro.objects.get(pk=pk)
    except Livro.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
