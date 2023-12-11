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
  import { useListaLivrosContext } from "@/contexts/ListaDeLivrosContext"
  import { useModalContext } from "@/contexts/ModalContext"
  import { v4 as uuidv4 } from 'uuid'
  import axios from "axios"
  
  export function ModalCriacaoLivro() {
  
    const [nomeLivro, setNomeLivro] = useState("")
    const [quantidadePaginas, setQuantidadePaginas] = useState("")
    const [categoria, setCategoria] = useState("")
    const { setListaLivros } = useListaLivrosContext();
    const { setModalOpen }  = useModalContext() 
  
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

      const uniqueId = uuidv4();

      const livroAdicionado = {
        id: uniqueId,
        nomeDoLivro: nomeLivro,
        quantidadeDePaginas: quantidadePaginas,
        categoria: categoria,
        paginaAtual: "0",
        concluido: false,
        imagem: await buscarImagemLivro(nomeLivro)        
      }
  
      setListaLivros(prevListaLivros => ([...prevListaLivros, livroAdicionado]));
      limpaCampos();
      setModalOpen(false);
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