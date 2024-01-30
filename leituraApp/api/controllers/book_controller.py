# from rest_framework import status
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from api.models.book import BookModel
# from api.serializers.book import BookSerializer
#
# @api_view(['GET'])
# def book_get(request):
#     items = BookModel.objects.all()
#     serializer = BookSerializer(items, many=True)
#     return Response(serializer.data)
#
# @api_view(['POST'])
# def book_post(request):
#     serializer = BookSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
# @api_view(['GET'])
# def book_get_id(request, pk):
#     try:
#         item = BookModel.objects.get(pk=pk)
#     except BookModel.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     serializer = BookSerializer(item)
#     return Response(serializer.data)
#
# @api_view(['PUT'])
# def book_put(request, pk):
#     try:
#         item = BookModel.objects.get(pk=pk)
#     except BookModel.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     serializer = BookSerializer(item, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
# @api_view(['DELETE'])
# def book_delete(request, pk):
#     try:
#         item = BookModel.objects.get(pk=pk)
#     except BookModel.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     item.delete()
#     return Response(status=status.HTTP_204_NO_CONTENT)