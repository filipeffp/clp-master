# import serializer from rest_framework
from rest_framework import serializers

# import model from models.py
from api.models.email import Email


# Create a model serializer
class EmailSerializer(serializers.ModelSerializer):
    # specify model and fields
    class Meta:
        model = Email
        fields = '__all__'
        #fields = ('title', 'description')