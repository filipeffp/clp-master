import { ModalsController } from "@/components/ModalsController";
import { useListaLivrosContext } from "@/contexts/ListaDeLivrosContext";
import { useModalContext } from "@/contexts/ModalContext";
import { BsBook, BsPlus } from "react-icons/bs";
import CardLivro from "./componentes/CardLivro";
import { useEffect, useState } from "react";
import InputText from "@/components/InputText";
import { LivroProps } from "@/types/LivroProps";

export default function MeusLivros() {

  const { modalOpen, setModalOpen, setModalQueEstaAberto } = useModalContext()
  const { listaLivros } = useListaLivrosContext()
  const [filtroPeloNome, setFiltroPeloNome] = useState("")
  const [livrosFiltrados, setLivrosFiltrados] = useState<LivroProps[]>([]);

  const abrirModalParaAdicionar = () => {
    setModalQueEstaAberto("criarLivro");
    setModalOpen(true);
  }

  useEffect(() => {
    const livrosFiltrados = listaLivros.filter((livro) =>
      livro.nomeDoLivro?.toLowerCase().includes(filtroPeloNome.toLowerCase())
    );
    setLivrosFiltrados(livrosFiltrados);
  }, [filtroPeloNome, listaLivros]);  

  return (
    <section>
      <div className='flex items-center mb-[35px]'>
        <BsBook className='text-[32px] text-azulPadrao'/>
        <h1 className='font-bold text-[32px] text-azulPadrao ml-[8px]'>MEUS LIVROS</h1>
      </div>

      <div className="flex items-center justify-center mb-[75px] gap-[10px]">
        <h2 className="text-[18px] text-azulPadrao">Busque seu livro pelo nome: </h2>
        <div className="w-[250px]">
          <InputText value={filtroPeloNome} setValue={setFiltroPeloNome}/>
        </div>
      </div>

      <div>
        <div className="flex justify-center flex-wrap gap-[60px]">
          {livrosFiltrados.map((livro, index) => {
            return <CardLivro {...livro} key={index} />
          })}
        </div>
        {modalOpen && <ModalsController/>}
        <button
          className="bg-azulPadrao text-white p-4 rounded-full shadow-md fixed bottom-10 right-10 transition-all duration-300 hover:shadow-lg"
          onClick={abrirModalParaAdicionar}
        >
          <BsPlus className="text-[48px]"/>
        </button>
      </div>
    </section>
  )
}
