from django.db import models

class Usuario(models.Model):
    usuario_id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=50)

    def criarConta(self):
        # Implemente a lógica de criação de conta aqui
        pass

    def adicionarLivro(self, livro):
        # Implemente a lógica de adição de livro aqui
        pass

    def listarLivro(self):
        # Implemente a lógica de listagem de livros aqui
        pass