import { useEffect, useState } from 'react';
import logo_inicio from '../../assets/logo_inicio.png'
import CardInfos from './componentes/CardInfos'
import { conteudoCardConcluido, conteudoCardEmAndamento, conteudoCardNaoIniciado } from "@/data/conteudoCardInfos";
import { useLogadoContext } from '@/contexts/LogadoContext';
import CardLivro from '../meusLivros/componentes/CardLivro';
import { SiVerizon } from "react-icons/si";
import { IoCloseSharp } from "react-icons/io5";
import { api } from '@/api/api';
import CardMeta from './componentes/CardMeta';

export default function Inicio() {

    const { setLogado, setUsuarioID, listaSugestoes, setListaSugestoes, usuarioID, buscaLivrosPorUsuario, metasDeLivros } = useLogadoContext();
    const [livrosAPI, setLivrosAPI] = useState<any[]>([]);
    const [comentariosAPI, setComentariosAPI] = useState<any[]>([]);
    

    const removerSugestao = (livroRemovido: any) => {
        setListaSugestoes(prevSugestoes => prevSugestoes.filter(livro => livro !== livroRemovido));
    };

    const adicionarSugestao = async (livroSelecionado: any) => {
        try {
            // Ajusta o livro para adicionar à lista do usuário
            const livroAjustado = {
                ...livroSelecionado,
                user_id: usuarioID,
                pagina_atual: 0,
                concluido: false,
                data_meta: "2024-02-19T01:20:09.958000Z",
                avaliacao: 0
            };

            delete livroAjustado.livro_id;

            // Faz a requisição para adicionar o livro à lista do usuário

            await api.post('/livros/criar', livroAjustado);

            // Após adicionar o livro com sucesso, remova-o da lista de sugestões
            buscaLivrosPorUsuario();

            removerSugestao(livroSelecionado);

            alert("Livro adicionado a lista!");
        } catch (error) {
            console.error('Erro ao adicionar sugestão:', error);
        }
    };

    function calculaDiasRestantes(data_meta: string) {
        // Converte a string de data_meta para objeto Date
        const dataMeta = new Date(data_meta);
        // Obtém a data atual
        const dataAtual = new Date();
        // Remove a parte do tempo das datas para garantir uma comparação correta
        dataMeta.setHours(0, 0, 0, 0);
        dataAtual.setHours(0, 0, 0, 0);
        // Calcula a diferença em milissegundos entre as duas datas
        const diferencaEmMilissegundos = dataMeta.getTime() - dataAtual.getTime();
        // Calcula a diferença em dias
        const diferencaEmDias = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
        return diferencaEmDias;
    }

    const buscaLivros = async () => {
        try {
            const response = await api.get("/livros/buscar");
            const livrosBuscados = response.data;
            console.log("Livros da API: ", livrosBuscados)
            setLivrosAPI(livrosBuscados)

        } catch (error) {
            console.error('Erro ao buscar livros', error);
        }
    }

    const buscaListaComentarios = async () => {
        try {
            const response = await api.get("/livros/comentarios_lista");
            const comentariosDaAPI = response.data;
            console.log("Comentários da API: ", comentariosDaAPI)
            setComentariosAPI(comentariosDaAPI)

        } catch (error) {
            console.error('Erro ao buscar comentários e avaliações:', error);
        }
    }

    function constroiCard(livro:any) {
        
        const livrosRelacionados = livrosAPI.filter((livroAPI) => livroAPI.titulo === livro.titulo);

        const totalAvaliacoes = livrosRelacionados.filter((livroAPI) => livroAPI.avaliacao !== 0).reduce((total, livroAPI) => total + livroAPI.avaliacao, 0);
        const mediaAvaliacoes = totalAvaliacoes / livrosRelacionados.filter((livroAPI) => livroAPI.avaliacao !== 0).length;        

        const comentariosDoLivro = comentariosAPI.filter((comentario: any) => {
            return comentario.nome === livro.titulo;
          });

        const comentarios = comentariosDoLivro.map((item: any) => item.comentario);        

        return <CardLivro {...livro} sugestao={true} avaliacaoReal={mediaAvaliacoes} comentarios={comentarios}/>
    }

    useEffect(() => {
        const loginData = JSON.parse(localStorage.getItem('login') || '');
        if (loginData && loginData.log) {
            // Se o login estiver armazenado e estiver logado, define o estado de logado como true
            setLogado(true);
            // Define o estado do userID com base nos dados armazenados no localStorage            
            setUsuarioID(loginData.userID);

            buscaLivros();
            buscaListaComentarios();
        }
    }, []);

    return (
        <section className='flex flex-col'>
            <div className='flex items-center mb-[35px]'>
                <img src={logo_inicio} alt='icone de início' className='h-[28px] w-[28px]' />
                <h1 className='font-bold text-[32px] text-azulPadrao ml-[8px]'>MEU PAINEL</h1>
            </div>       

            {listaSugestoes.length > 0 && (
                <div className='flex flex-col items-center gap-[35px] mb-[60px]'>
                    <div className="flex flex-col items-center">
                        <h2 className='font-bold text-[28px] text-azulPadrao'>Deseja adicionar algum dos livros recomendados a sua lista?</h2>
                        <p className='text-azulPadrao'>Os livros podem ser avaliados por outros usuários após o término da leitura. Passando o mouse no card de cada livro, você consegue visualizar comentários.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        {listaSugestoes.map((livro, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className='flex items-center gap-2'>
                                    <button onClick={() => adicionarSugestao(livro)}>
                                        <SiVerizon className="text-green-500 text-[30px]" />
                                    </button>
                                    <button onClick={() => removerSugestao(livro)}>
                                        <IoCloseSharp className="text-vermelhoClaro text-[50px]" />
                                    </button>
                                </div>
                                {constroiCard(livro)}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className='flex flex-col items-center'>
                <h2 className='font-bold text-[28px] text-azulPadrao'>ESTADO DOS LIVROS CADASTRADOS</h2>
                <div className='flex w-full justify-center gap-[40px] mt-[75px] mb-[75px]'>
                    <CardInfos {...conteudoCardNaoIniciado} />
                    <CardInfos {...conteudoCardEmAndamento} />
                    <CardInfos {...conteudoCardConcluido} />
                </div>
            </div>

            <div>
                {metasDeLivros.length > 0 && (
                    <div className='flex flex-col items-center'>
                        <h2 className='font-bold text-[28px] text-azulPadrao'>METAS ATUAIS</h2>
                        <div className='flex gap-[100px] mt-[75px] flex-wrap justify-center'>
                            {metasDeLivros.map((livro, index) => (
                                <div key={index} className='flex flex-col items-center gap-[15px]'>
                                    <h2 className='text-azulPadrao'>{livro.titulo}</h2>
                                    <CardMeta firstValuePercentage={(livro.pagina_atual / livro.quantidade_paginas) * 100} paginaAtual={livro.pagina_atual} paginaFinal={livro.quantidade_paginas} />
                                    <p className='text-azulPadrao'>{calculaDiasRestantes(livro.data_meta)} dias restantes</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

