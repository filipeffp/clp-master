from django.db import models

from api.models.livro import Livro
from api.models.usuario import Usuario


class ColecaoPessoal(models.Model):
    colecao_id = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    livros = models.ManyToManyField(Livro)

    def adicionarLivro(self, livro):
        # Implemente a lógica de adição de livro à coleção pessoal aqui
        pass

    def removerLivro(self, livro):
        # Implemente a lógica de remoção de livro da coleção pessoal aqui
        pass