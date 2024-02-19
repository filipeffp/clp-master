import {
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  import TituloCampo from "../../../../components/TituloCampo"
  import SelectCategoria from "../../../../components/SelectCategoria"
  import { useState } from "react"
  import InputText from "../../../../components/InputText"
  import InputNumber from "../../../../components/InputNumber"  
  import { useModalContext } from "@/contexts/ModalContext"  
  import axios from "axios"
import { useLogadoContext } from "@/contexts/LogadoContext"
import { api } from "@/api/api"
  
  export function ModalCriacaoLivro() {
  
    const [nomeLivro, setNomeLivro] = useState("")
    const [quantidadePaginas, setQuantidadePaginas] = useState("")
    const [categoria, setCategoria] = useState("")    
    const { setModalOpen }  = useModalContext() 

    const { usuarioID, buscaLivrosPorUsuario } = useLogadoContext();
  
    function limpaCampos() {
      setNomeLivro("")
      setQuantidadePaginas("")
      setCategoria("")
    }

    const buscarImagemLivro = async (nome:any) => {
      const busca = `capa do livro ${nome}`
      try {
        const response = await axios.get(
          `https://www.googleapis.com/customsearch/v1?q=${busca}&key=AIzaSyAgiU1Bcn3I-7nHHevvI3bWXHSYiaY3uF4&cx=61e32c63bae2147be&searchType=image`
        );
  
        // Obtém a primeira imagem dos resultados da pesquisa
        const primeiraImagem = response.data.items[0].link;        
        return primeiraImagem
      } catch (error) {
        console.error('Erro ao buscar imagem do livro:', error);
      }
    };
  
    async function adicionarLivro() {      

      const livroAdicionado = {        
        titulo: nomeLivro,
        quantidade_paginas: quantidadePaginas,
        categoria: categoria,
        pagina_atual: "0",
        concluido: false,
        user_id: usuarioID,
        imagem: await buscarImagemLivro(nomeLivro),
        data_meta: "2024-02-19T01:20:09.958000Z",
        avaliacao: 0       
      }

      try {
        // Faz a requisição POST para adicionar o livro
        const response = await api.post("/livros/criar", livroAdicionado);
    
        // Verifica se a requisição foi bem-sucedida
        if (response.status >= 200 && response.status < 300) {
          console.log("Livro adicionado com sucesso!");
          // Limpa os campos e fecha o modal
          buscaLivrosPorUsuario();
          limpaCampos();
          setModalOpen(false);
        } else {
          console.error("Erro ao adicionar livro:", response.data);
        }
      } catch (error) {
        console.error("Erro ao adicionar livro:", error);
      }          
    }
  
    return (
      <DialogContent className='min-w-[400px] h-[350px] border-azulPadrao'>
        <DialogHeader className="flex-col items-center">
          <DialogTitle className="text-azulPadrao font-semibold text-[32px] leading-none">ADICIONAR LIVRO</DialogTitle>
        </DialogHeader>
        <div className="flex-column">
          <div className="">
            <TituloCampo>Nome do livro</TituloCampo>
            <InputText value={nomeLivro} setValue={setNomeLivro} />
          </div>
          <div className="mt-[20px]">
            <TituloCampo>Quantidade de páginas</TituloCampo>
            <InputNumber value={quantidadePaginas} setValue={setQuantidadePaginas} />
          </div>
          <div className="flex justify-between items-center mt-[20px]">
            <div>
              <TituloCampo>Categoria</TituloCampo>
              <SelectCategoria selectedValue={categoria} setSelectedValue={setCategoria} />
            </div>
            <button className='text-[14px] font-semibold text-white bg-azulPadrao px-[20px] py-[0px] mr-[10px] rounded-full h-[40px]' onClick={adicionarLivro}>Adicionar</button>
          </div>
        </div>
      </DialogContent>
    )
  }