import logo_inicio from '../../assets/logo_inicio.png'
import CardInfos from './componentes/CardInfos'
import { conteudoCardConcluido, conteudoCardEmAndamento, conteudoCardNaoIniciado } from "@/data/conteudoCardInfos";

export default function Inicio() {
    return (
        <section>
            <div className='flex items-center mb-[35px]'>
                <img src={logo_inicio} alt='icone de início' className='h-[28px] w-[28px]' />
                <h1 className='font-bold text-[32px] text-azulPadrao ml-[8px]'>MEU PAINEL</h1>
            </div>            
            <div className='flex flex-col items-center'>
            <h2 className='text-[28px] text-azulPadrao'>ESTADOS DOS LIVROS CADASTRADOS</h2>
            <div className='flex w-full justify-center gap-[40px] mt-[20px]'>
                <CardInfos {...conteudoCardNaoIniciado}/>
                <CardInfos {...conteudoCardEmAndamento}/>
                <CardInfos {...conteudoCardConcluido}/>                
            </div>
            </div>
        </section>
    )
}
