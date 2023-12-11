import { LivroProps } from "@/types/LivroProps";
import { createContext, useContext, useState } from "react";

interface ListaDeLivrosContextProps {
  listaLivros: LivroProps[];
  setListaLivros: React.Dispatch<React.SetStateAction<LivroProps[]>>;
}

export const ListaDeLivrosContext = createContext<ListaDeLivrosContextProps>({
  listaLivros: [],
  setListaLivros: () => { },
});

export function ListaLivrosProvider({ children }: { children: React.ReactNode }) {

  const [listaLivros, setListaLivros] = useState<LivroProps[]>([{ 
    id: "1",
    nomeDoLivro: "A cabana",
    quantidadeDePaginas: 1000,
    categoria: "Fantasia",
    paginaAtual: "500",
    concluido: false,
    imagem: "https://m.media-amazon.com/images/I/91fLBlcmpXL._AC_UF1000,1000_QL80_.jpg",
},
{
    id: "2",
    nomeDoLivro: "Dom Quixote",
    quantidadeDePaginas: 800,
    categoria: "Clássico",
    paginaAtual: "800",
    concluido: true,
    imagem: "https://m.media-amazon.com/images/I/41jj7aHxH4L.jpg",
},
{
    id: "3",
    nomeDoLivro: "A Revolução dos Bichos",
    quantidadeDePaginas: 200,
    categoria: "Ficção",
    paginaAtual: "0",
    concluido: false,
    imagem: "https://m.media-amazon.com/images/I/91BsZhxCRjL._AC_UF1000,1000_QL80_.jpg",
},
{
    id: "4",
    nomeDoLivro: "1984",
    quantidadeDePaginas: 300,
    categoria: "Distopia",
    paginaAtual: "200",
    concluido: false,
    imagem: "https://m.media-amazon.com/images/I/81l3pUGbT8L._AC_UF1000,1000_QL80_.jpg",
}, 
{
    id: "5",
    nomeDoLivro: "Cem Anos de Solidão",
    quantidadeDePaginas: 500,
    categoria: "Realismo Mágico",
    paginaAtual: "100",
    concluido: false,
    imagem: "https://m.media-amazon.com/images/I/81SQPrWU7SL._AC_UF1000,1000_QL80_.jpg",
},
 {
    id: "6",
    nomeDoLivro: "Percy Jackson",
    quantidadeDePaginas: 350,
    categoria: "Fantasia",
    paginaAtual: "0",
    concluido: false,
    imagem: "https://m.media-amazon.com/images/I/A1UjcPz4gZL._AC_UF1000,1000_QL80_.jpg",
},
{
    id: "7",
    nomeDoLivro: "A Culpa é das Estrelas",
    quantidadeDePaginas: 300,
    categoria: "Romance",
    paginaAtual: "300",
    concluido: true,
    imagem: "https://m.media-amazon.com/images/I/91K-MrUTNOL._AC_UF1000,1000_QL80_.jpg",
}]);  // criando com alguns livros já precadastrados

  return (
    <ListaDeLivrosContext.Provider value={{ listaLivros, setListaLivros }}>
      {children}
    </ListaDeLivrosContext.Provider>
  );
}

export function useListaLivrosContext() {
  return useContext(ListaDeLivrosContext);
}