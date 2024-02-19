export interface LivroProps{
    livro_id: any;
    titulo: string | undefined,       
    quantidade_paginas: any | undefined;
    categoria: string | undefined;
    pagina_atual: any | undefined;
    concluido: boolean | undefined;
    user_id: any | undefined,
    imagem: any;
    data_meta: any,
    avaliacao: any
}
