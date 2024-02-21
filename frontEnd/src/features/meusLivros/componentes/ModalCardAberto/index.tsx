import { useModalContext } from "@/contexts/ModalContext"
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"
import { useState } from "react"
import InputNumber from "../../../../components/InputNumber"
import { api } from "@/api/api"
import { useLogadoContext } from "@/contexts/LogadoContext"
import { FaRegStar, FaStar } from "react-icons/fa";
import DatePickerDemo from "@/components/DatePickerDemo"


export default function ModalCardAberto() {

    const { cardAberto, setModalOpen } = useModalContext()
    const [paginaAtual, setPaginaAtual] = useState("");
    const { buscaLivrosPorUsuario, usuarioID } = useLogadoContext();
    const [avaliacao, setAvalicao] = useState(false);
    const [rating, setRating] = useState(0);
    const [date, setDate] = useState<Date>()
    const [comentario, setComentario] = useState("");

    async function atualizarProgressoNoHistorico() {

        const dataAtual = new Date();

        const progresso = {
            data_leitura: dataAtual,
            pagina_atual: paginaAtual != "" ? paginaAtual : cardAberto?.pagina_atual,
            data_meta: cardAberto?.data_meta,
            usuario: usuarioID,
            livro: cardAberto?.livro_id
        }

        try {
            // Faz a requisição POST para a API e aguarda a resposta
            const resposta = await api.post("/historicos/criar", progresso)

            // Aqui você pode manipular a resposta se necessário
            console.log("Resposta da API:", resposta);
        } catch (erro) {
            // Se ocorrer algum erro durante a requisição, ele será capturado aqui
            console.error("Erro ao fazer requisição:", erro);
        }
    }

    async function salvarEdicaoLivro() {
        const livroEditado = {
            id: cardAberto?.livro_id,
            titulo: cardAberto?.titulo,
            quantidade_paginas: cardAberto?.quantidade_paginas,
            categoria: cardAberto?.categoria,
            pagina_atual: paginaAtual != "" ? paginaAtual : cardAberto?.pagina_atual,
            concluido: cardAberto?.concluido && paginaAtual == "" ? true : false,
            user_id: cardAberto?.user_id,
            imagem: cardAberto?.imagem,
            data_meta: cardAberto?.data_meta,
            avaliacao: 0
        }

        await api.put(`/livros/atualizar?id=${cardAberto?.livro_id}`, livroEditado)
            .then(response => {
                console.log('Livro atualizado com sucesso:', response.data);
                atualizarProgressoNoHistorico();
                buscaLivrosPorUsuario();
                setModalOpen(false);
                // Faça algo após o sucesso da requisição, se necessário
            })
            .catch(error => {
                console.error('Erro ao atualizar livro:', error);
                // Lidar com o erro, se necessário
            });
    }

    async function atualizaMetaNoHistorico() {

        const dataAtual = new Date();

        const progresso = {
            data_leitura: dataAtual,
            pagina_atual: paginaAtual != "" ? paginaAtual : cardAberto?.pagina_atual,
            data_meta: date ? date : "2024-02-20T23:48:40.204Z",
            usuario: usuarioID,
            livro: cardAberto?.livro_id
        }

        try {
            await api.post("/historicos/criar", progresso)
        } catch (erro) {
            console.error("Erro ao fazer requisição:", erro);
        }
    }

    function adicionarMeta() {
        const livroEditado = {
            id: cardAberto?.livro_id,
            titulo: cardAberto?.titulo,
            quantidade_paginas: cardAberto?.quantidade_paginas,
            categoria: cardAberto?.categoria,
            pagina_atual: paginaAtual != "" ? paginaAtual : cardAberto?.pagina_atual,
            concluido: cardAberto?.concluido && paginaAtual == "" ? true : false,
            user_id: cardAberto?.user_id,
            imagem: cardAberto?.imagem,
            data_meta: date,
            avaliacao: cardAberto?.avaliacao
        }

        api.put(`/livros/atualizar?id=${cardAberto?.livro_id}`, livroEditado)
            .then(response => {
                console.log('Livro atualizado com sucesso:', response.data);
                atualizaMetaNoHistorico()
                buscaLivrosPorUsuario();
                setModalOpen(false);
            })
            .catch(error => {
                console.error('Erro ao atualizar livro:', error);
            });
    }

    function deletarLivro() {
        if (cardAberto?.livro_id) {
            // Faz a requisição DELETE para deletar o livro
            api.delete(`/livros/deletar?id=${cardAberto?.livro_id}`)
                .then(response => {
                    console.log('Livro deletado com sucesso:', response.data);
                    buscaLivrosPorUsuario();
                    setModalOpen(false); // Fechar o modal após excluir o livro
                })
                .catch(error => {
                    console.error('Erro ao deletar livro:', error);
                    // Lidar com o erro, se necessário
                });
        }
    }

    function concluirLivro() {
        const livroEditado = {
            id: cardAberto?.livro_id,
            titulo: cardAberto?.titulo,
            quantidade_paginas: cardAberto?.quantidade_paginas,
            categoria: cardAberto?.categoria,
            pagina_atual: cardAberto?.quantidade_paginas,
            concluido: true,
            user_id: cardAberto?.user_id,
            imagem: cardAberto?.imagem,
            data_meta: cardAberto?.data_meta,
            avaliacao: rating,
        }

        const comentarioParaBD = {
            livros: [
                {
                    usuario_id: usuarioID,
                    nome: cardAberto?.titulo,
                    comentario: comentario
                }
            ]
        }

        api.put(`/livros/atualizar?id=${cardAberto?.livro_id}`, livroEditado)
            .then(response => {
                console.log('Livro atualizado com sucesso:', response.data);

                api.post("/livros/comentarios", comentarioParaBD)
                    .then(response => {
                        console.log(response.data)
                        buscaLivrosPorUsuario();
                        setModalOpen(false);
                    })
            })
            .catch(error => {
                console.error('Erro ao atualizar livro:', error);
            });
    }

    function abreMenuAvaliacao() {
        setAvalicao(true);
    }

    const handleCommentChange = (event: any) => {
        setComentario(event.target.value);
    };

    return (
        <DialogContent className='min-w-[400px] h-[400px] border-azulPadrao justify-center pb-0'>
            <DialogHeader className="flex-col items-center h-[0px] mb-[50px]">
                <DialogTitle className="text-azulPadrao font-semibold text-[32px] leading-none">{cardAberto?.titulo}</DialogTitle>
                <DialogDescription className="text-azulPadrao">{cardAberto?.categoria}</DialogDescription>
            </DialogHeader>
            <div className="flex-column">
                {avaliacao ? (
                    <div>
                        <div className="flex justify-center mb-[10px]">
                            <h3 className="text-azulPadrao text-[32px] ">O que você achou do livro?</h3>
                        </div>
                        <div className="flex gap-[8px] justify-center items-center">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <div key={value} onClick={() => setRating(value)}>
                                    {value <= rating ? (
                                        <FaStar className="text-azulPadrao text-[26px]" />
                                    ) : (
                                        <FaRegStar className="text-azulPadrao text-[26px]" />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col justify-center mt-[25px] items-center">
                            <textarea
                                placeholder="Digite seu comentário"
                                value={comentario}
                                onChange={handleCommentChange}
                                className="border border-gray-300 px-4 py-2 rounded-md mr-2 h-[100px] w-[350px]"
                            />
                            <button onClick={concluirLivro} className="bg-azulPadrao text-white px-6 py-3 rounded-full mt-4 hover:bg-opacity-80 w-[200px]">
                                Enviar
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-center mb-[10px]">
                            <h3 className="text-azulPadrao text-[20px] ">Em qual página você parou?</h3>
                        </div>
                        <div className="flex gap-[8px] justify-center items-center">
                            <InputNumber value={paginaAtual} setValue={setPaginaAtual} placeholder={cardAberto?.pagina_atual} estilos="w-[70px] h-[25px]" />
                            <p className="text-[24px] text-azulPadrao">/</p>
                            <p className="text-[24px] text-azulPadrao">{cardAberto?.quantidade_paginas}</p>
                        </div>
                        <div className="flex mt-[30px] gap-[20px]">
                            <button className='text-[14px] font-semibold text-white bg-vermelhoClaro px-[20px] py-[0px]  rounded-full h-[40px]' onClick={deletarLivro}>Deletar livro</button>
                            <button className='text-[14px] font-semibold text-white bg-azulPadrao px-[20px] py-[0px]  rounded-full h-[40px]' onClick={salvarEdicaoLivro}>Salvar alterações</button>
                            <button className='text-[14px] font-semibold text-white bg-verde px-[20px] py-[0px] rounded-full h-[40px]' onClick={abreMenuAvaliacao}>Terminar livro</button>
                        </div>
                        <div className="flex justify-center mt-[25px]">
                            <DatePickerDemo date={date} setDate={setDate} />
                            <button className='ml-[10px] text-[14px] font-semibold text-white bg-cinzaEscuro px-[20px] py-[0px] rounded-full h-[40px]' onClick={adicionarMeta}>Adicionar meta</button>
                        </div>
                    </>
                )}
                <div className="flex justify-around mt-[30px]">
                    {/* 
                    <h3 className="text-[26px] text-azulPadrao">Anotações</h3>                    
                    <button className='text-[14px] font-semibold text-white bg-cinzaEscuro px-[20px] py-[0px] mr-[10px] rounded-full h-[40px]'>Adicionar anotação</button>]
                    */}
                </div>
            </div>
        </DialogContent>
    )
}
