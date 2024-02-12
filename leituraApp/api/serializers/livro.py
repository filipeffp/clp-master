# import serializer from rest_framework
from rest_framework import serializers

# import model from models.py
from api.models.livro import Livro


# Create a model serializer
class LivroSerializer(serializers.ModelSerializer):
    # specify model and fields
    class Meta:
        model = Livro
        fields = '__all__'
        #fields = ('title', 'description')