import { LivroProps } from "@/types/LivroProps"
import { useModalContext } from "@/contexts/ModalContext";
import { FaRegStar, FaStar } from "react-icons/fa";

interface CardLivroProps extends LivroProps {
  sugestao?: boolean; // Substitua 'novaProp' pelo nome da nova propriedade
}

export default function CardLivro({ sugestao, ...livro }: CardLivroProps) {

  const { setModalOpen, setModalQueEstaAberto, setCardAberto } = useModalContext()

  function getClassString() {
    if (sugestao) {
      return 'bg-laranjaClaro';
    }
    if (livro.pagina_atual === 0 && !livro.concluido) {
      return 'bg-cinzaEscuro';
    }
    if (livro.pagina_atual !== 0 && !livro.concluido) {
      return 'bg-azulPadrao';
    }
    if (livro.concluido) {
      return 'bg-verdeEscuro';
    }
    return ""; // Retorna uma string vazia se nenhuma condição for atendida
  }

  const abrirCardModal = (livro: any) => {
    setCardAberto(livro);
    setModalQueEstaAberto("visualizarCard")
    setModalOpen(true);
  }

  return (
    <div>
      
      <div onClick={() => !sugestao && abrirCardModal(livro)} className={`w-[220px] h-[280px] overflow-hidden border-black border rounded-md cursor-pointer ${sugestao ? 'pointer-events-none' : ''}`}>
        {/* Metade superior com ícone */}
        <div className="h-3/5 bg-white flex items-center justify-center border-b border-black">
          <img src={livro.imagem} className="w-[230px] h-[166px]" />
        </div>
        {/* Metade inferior com background retornado da função */}
        <div className={`h-2/5 ${getClassString()} p-2`}>
          <div className="flex flex-col items-center h-full">
            <h1 className="text-[18px] text-bold text-white mt-[15px] mb-[20px]">{livro.titulo}</h1>
            <div className="flex w-full justify-around">
              <p className="text-white text-[14px]">{livro.categoria}</p>
              <p className="text-white text-[14px]">{sugestao ? 0 : livro.pagina_atual}/{livro.quantidade_paginas}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[5px]">

        {livro.avaliacao !== 0 && (
          <div className="flex gap-[8px] justify-center items-center">
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value}>
                {value <= livro.avaliacao ? (
                  <FaStar className="text-azulPadrao text-[18px]" />
                ) : (
                  <FaRegStar className="text-azulPadrao text-[18px]" />
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

