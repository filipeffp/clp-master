# import serializer from rest_framework
from rest_framework import serializers

# import model from models.py
from api.models.historico import Historico



# Create a model serializer
class HistoricoSerializer(serializers.ModelSerializer):
    # specify model and fields
    class Meta:
        model = Historico
        fields = '__all__'
        extra_kwargs = {
            'data_meta': {'allow_null': True}
        }
        #fields = ('title', 'description')