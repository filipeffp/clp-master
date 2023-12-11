import { LivroProps } from "@/types/LivroProps"
import { useModalContext } from "@/contexts/ModalContext";

export default function CardLivro(livro: LivroProps){

    const { setModalOpen, setModalQueEstaAberto, setCardAberto } = useModalContext()

    function getClassString() {
        if (livro.paginaAtual === "0" && !livro.concluido) {
            return `bg-cinzaEscuro`;
        }
        if (livro.paginaAtual !==  "0" && !livro.concluido) {
            return `bg-azulPadrao`;
        }
        if (livro.concluido) {
            return `bg-verdeEscuro`;
        }
        return ""; // Retorna uma string vazia se nenhuma condição for atendida
    }  

    const abrirCardModal = (livro:any) => {
        setCardAberto(livro);
        setModalQueEstaAberto("visualizarCard")
        setModalOpen(true);        
      }

    return (
        <div onClick={() => abrirCardModal(livro)} className="w-[220px] h-[280px] overflow-hidden border-black border rounded-md cursor-pointer">
            {/* Metade superior com ícone */}
            <div className="h-3/5 bg-white flex items-center justify-center border-b border-black">
                <img src={livro.imagem} className="w-[230px] h-[166px]"/>
            </div>
            {/* Metade inferior com background retornado da função */}
            <div className={`h-2/5 ${getClassString()} p-2`}>
                <div className="flex flex-col items-center h-full">
                    <h1 className="text-[18px] text-bold  text-white mt-[15px] mb-[20px]">{livro.nomeDoLivro}</h1>
                    <div className="flex w-full justify-around">
                        <p className="text-white text-[14px]">{livro.categoria}</p>
                        <p className="text-white text-[14px]">{livro.paginaAtual}/{livro.quantidadeDePaginas}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

