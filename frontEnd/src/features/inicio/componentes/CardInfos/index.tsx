import { useEffect, useState } from 'react';
import { useListaLivrosContext } from "@/contexts/ListaDeLivrosContext";
import { LivroProps } from '@/types/LivroProps';

export default function CardInfos({ imagem, tipo, estilo }: any) {
  const { listaLivros } = useListaLivrosContext();
  const [livrosFiltrados, setLivrosFiltrados] = useState<LivroProps[] | undefined>([]);

  useEffect(() => {
    // Chame a função de filtragem aqui e atualize o estado com os livros filtrados
    if(listaLivros){
    const livrosFiltrados = filtrarLivros(listaLivros);
    setLivrosFiltrados(livrosFiltrados);
    }
  }, [listaLivros]);

  const filtrarLivros = (livros:LivroProps[] ) => {
    if(tipo == 1) {
      const livrosFiltrados = livros.filter(livro => livro.paginaAtual === "0" && !livro.concluido);
      return livrosFiltrados;
    }
    if (tipo == 2) {
      const livrosFiltrados = livros.filter(livro => livro.paginaAtual !== "0" && !livro.concluido);
      return livrosFiltrados;
    }
    if (tipo == 3) {
      const livrosFiltrados = livros.filter(livro => livro.concluido);
      return livrosFiltrados;
    }
  }

  return (
    <div className="relative w-[238px] h-[95px]">
      {imagem}
      {/* Exibe o tamanho da lista filtrada no elemento <p> */}
      <p className={`absolute ${estilo} text-[28px] font-bold text-white`}>{livrosFiltrados?.length}</p>
    </div>
  )
}