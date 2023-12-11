import { useModalContext } from "@/contexts/ModalContext"
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"
import { useState } from "react"
import InputNumber from "../../../../components/InputNumber"
import { useListaLivrosContext } from "@/contexts/ListaDeLivrosContext"

export default function ModalCardAberto() {

    const { cardAberto, setModalOpen } = useModalContext()
    const [paginaAtual, setPaginaAtual] = useState("");
    const { listaLivros, setListaLivros } = useListaLivrosContext()

    function salvarEdicaoLivro() {
        const livroEditado = {
            id: cardAberto?.id,
            nomeDoLivro: cardAberto?.nomeDoLivro,
            quantidadeDePaginas: cardAberto?.quantidadeDePaginas,
            categoria: cardAberto?.categoria,
            paginaAtual: paginaAtual != ""? paginaAtual: cardAberto?.paginaAtual,
            concluido: cardAberto?.concluido && paginaAtual == ""? true : false,
            imagem: cardAberto?.imagem
        }

        const livroIndex = listaLivros.findIndex(
            (livro) => livro.id === cardAberto?.id
        );

        if (livroIndex !== -1) {
            // Atualizar a lista com o livro editado
            const novaListaLivros = [...listaLivros];
            novaListaLivros[livroIndex] = livroEditado;

            // Atualizar o estado da lista de livros
            setListaLivros(novaListaLivros);
            setModalOpen(false)
        }
    }

    function deletarLivro() {
        if (cardAberto?.id) {
            // Filtrar a lista para excluir o livro com o ID correspondente
            const novaListaLivros = listaLivros.filter(livro => livro.id !== cardAberto.id);

            // Atualizar o estado da lista de livros
            setListaLivros(novaListaLivros);
            setModalOpen(false); // Fechar o modal após excluir o livro
        }
    }

    function concluirLivro(){
        const livroEditado = {
            id: cardAberto?.id,
            nomeDoLivro: cardAberto?.nomeDoLivro,
            quantidadeDePaginas: cardAberto?.quantidadeDePaginas,
            categoria: cardAberto?.categoria,
            paginaAtual: cardAberto?.quantidadeDePaginas,
            concluido: true,
            imagem: cardAberto?.imagem
        }

        const livroIndex = listaLivros.findIndex(
            (livro) => livro.id === cardAberto?.id
        );

        if (livroIndex !== -1) {
            // Atualizar a lista com o livro editado
            const novaListaLivros = [...listaLivros];
            novaListaLivros[livroIndex] = livroEditado;

            // Atualizar o estado da lista de livros
            setListaLivros(novaListaLivros);
            setModalOpen(false)
        }
    }

    return (
        <DialogContent className='min-w-[400px] h-[400px] border-azulPadrao justify-center pb-0'>
            <DialogHeader className="flex-col items-center h-[0px] mb-[50px]">
                <DialogTitle className="text-azulPadrao font-semibold text-[32px] leading-none">{cardAberto?.nomeDoLivro}</DialogTitle>
                <DialogDescription className="text-azulPadrao">{cardAberto?.categoria}</DialogDescription>
            </DialogHeader>
            <div className="flex-column mt-[-20px]">
                <div className="flex justify-center mb-[10px]">
                    <h3 className="text-azulPadrao text-[20px] ">Em qual página você parou?</h3>
                </div>
                <div className="flex gap-[8px] justify-center items-center">
                    <InputNumber value={paginaAtual} setValue={setPaginaAtual} placeholder={cardAberto?.paginaAtual} estilos="w-[70px] h-[25px]"/>
                    <p className="text-[24px] text-azulPadrao">/</p>
                    <p className="text-[24px] text-azulPadrao">{cardAberto?.quantidadeDePaginas}</p>
                </div>

                <div className="flex mt-[30px] gap-[20px]">                    
                    <button className='text-[14px] font-semibold text-white bg-vermelhoClaro px-[20px] py-[0px]  rounded-full h-[40px]' onClick={deletarLivro}>Deletar livro</button>
                    <button className='text-[14px] font-semibold text-white bg-azulPadrao px-[20px] py-[0px]  rounded-full h-[40px]' onClick={salvarEdicaoLivro}>Salvar alterações</button>
                    <button className='text-[14px] font-semibold text-white bg-verde px-[20px] py-[0px] rounded-full h-[40px]' onClick={concluirLivro}>Terminar livro</button>
                </div>

             
                <div className="flex justify-around mt-[30px]">
                    <h3 className="text-[26px] text-azulPadrao">Anotações</h3>                    
                    <button className='text-[14px] font-semibold text-white bg-cinzaEscuro px-[20px] py-[0px] mr-[10px] rounded-full h-[40px]'>Adicionar anotação</button>
                </div>
                

            </div>
        </DialogContent>
    )
}
