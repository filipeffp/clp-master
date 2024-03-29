import { ModalsController } from "@/components/ModalsController";
import { useModalContext } from "@/contexts/ModalContext";
import { BsBook, BsPlus } from "react-icons/bs";
import CardLivro from "./componentes/CardLivro";
import { useEffect, useState } from "react";
import InputText from "@/components/InputText";
import { LivroProps } from "@/types/LivroProps";
import { useLogadoContext } from "@/contexts/LogadoContext";

export default function MeusLivros() {

  const { modalOpen, setModalOpen, setModalQueEstaAberto } = useModalContext()
  const { livros, setLogado, setUsuarioID } = useLogadoContext();
  const [filtroPeloNome, setFiltroPeloNome] = useState("")
  const [livrosFiltrados, setLivrosFiltrados] = useState<LivroProps[]>([]);

  const abrirModalParaAdicionar = () => {
    setModalQueEstaAberto("criarLivro");
    setModalOpen(true);
  }

  useEffect(() => {
    const livrosFiltrados = livros.filter((livro: any) =>
      livro.titulo?.toLowerCase().includes(filtroPeloNome.toLowerCase())
    );
    setLivrosFiltrados(livrosFiltrados);

  }, [filtroPeloNome, livros]);

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem('login') || '');
    if (loginData && loginData.log) {
      // Se o login estiver armazenado e estiver logado, define o estado de logado como true
      setLogado(true);
      // Define o estado do userID com base nos dados armazenados no localStorage
      setUsuarioID(loginData.userID);
      // Você pode fazer outras operações com os dados do login aqui, se necessário
    }
  }, []);

  return (
    <section>
      <div className='flex items-center mb-[35px]'>
        <BsBook className='text-[32px] text-azulPadrao' />
        <h1 className='font-bold text-[32px] text-azulPadrao ml-[8px]'>MEUS LIVROS</h1>
      </div>

      <div className="flex items-center justify-center mb-[75px] gap-[10px]">
        <h2 className="text-[18px] text-azulPadrao">Busque seu livro pelo nome: </h2>
        <div className="w-[250px]">
          <InputText value={filtroPeloNome} setValue={setFiltroPeloNome} />
        </div>
      </div>

      <div>
        <div className="flex justify-center flex-wrap gap-[50px]">
          {livrosFiltrados.map((livro, index) => {
            let metaMessage = '';

            if (livro.data_meta !== "2024-02-19T01:20:09.958000Z" && !livro.concluido) { // Verifica se a propriedade data_meta está presente
              const dataMeta = new Date(livro.data_meta);
              const hoje = new Date();
              const diffTime = dataMeta.getTime() - hoje.getTime();
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

              if (diffDays > 0 && diffDays < 10) {
                metaMessage = `A meta vai encerrar em ${diffDays} dias`;
              } else if (diffDays === 0) {
                metaMessage = 'Sua meta encerra hoje';
              } else {
                metaMessage = 'Sua meta expirou';
              }
            }

            return (
              <div key={index} className="flex flex-col items-center">
                <CardLivro {...livro} />
                <div className="text-red p-2 text-[14px]">
                  {metaMessage}
                </div>
              </div>
            );
          })}
        </div>
        {modalOpen && <ModalsController />}
        <button
          className="bg-azulPadrao text-white p-4 rounded-full shadow-md fixed bottom-10 right-10 transition-all duration-300 hover:shadow-lg"
          onClick={abrirModalParaAdicionar}
        >
          <BsPlus className="text-[48px]" />
        </button>
      </div>
    </section>
  )
}