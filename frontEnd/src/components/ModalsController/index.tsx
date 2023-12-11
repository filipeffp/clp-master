import { useModalContext } from "@/contexts/ModalContext"
import { ModalCriacaoLivro } from "../../features/meusLivros/componentes/ModalCriacaoLivro"
import ModalCardAberto from "../../features/meusLivros/componentes/ModalCardAberto"

export function ModalsController() { 
  const { modalOpen, modalQueEstaAberto }  = useModalContext() 

  if(modalOpen){
    if(modalQueEstaAberto == "criarLivro"){
      return <ModalCriacaoLivro/>
    }
    if(modalQueEstaAberto == "visualizarCard"){
      return <ModalCardAberto/>
    }
  }  
}