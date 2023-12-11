import imagemCardConcluido from '../assets/card_livrosConcluidos.png'
import imagemCardNaoIniciado from '../assets/card_livrosNaoIniciados.png'
import imagemCardEmAndamento from '../assets/card_livrosEmAndamento.png'

export const conteudoCardNaoIniciado = {    
    imagem: <img src={imagemCardNaoIniciado} alt='card de livros não iniciados' />,
    tipo: "1",
    estilo: "top-[15px] left-[155px]"
}

export const conteudoCardEmAndamento = {
    imagem: <img src={imagemCardEmAndamento} alt='card de livros em andamento' />,
    tipo:"2",
    estilo: "top-[15px] left-[155px]"
}

export const conteudoCardConcluido = {
    imagem: <img src={imagemCardConcluido} alt='card de livros concluídos' />,
    tipo:"3",
    estilo: "top-[15px] left-[165px]"
}