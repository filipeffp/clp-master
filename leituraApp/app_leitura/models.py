from django.db import models

# Create your models here.

class Book(models.Model):
	name         = models.CharField(max_length=60)
	writter      = models.CharField(max_length=60)
	pages_num    = models.IntegerFild()
	release_date = models.DateFild()


class Client(models.Model):
	username = models.CharField(max_length=60)
	age      = models.IntegerFild()
