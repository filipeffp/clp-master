from django.db import models

# Create your models here.

class Livro(models.Model):
	nomeLivro			   = models.CharField(max_length=60)
	quantidadePaginas      = models.IntegerFild()
	categoria              = models.CharField(max_length=60)
	paginaAtual            = models.IntegerFild()
	concluido			   = models.BooleanField(false)


class Client(models.Model):
	username = models.CharField(max_length=60)
	age      = models.IntegerFild()
