import icon_inicio from '../../assets/inicio.png'
import icon_meusLivros from '../../assets/icone_meusLivros.png'
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

interface Botao {
    url:string,
    imagem: string,
    id: number,    
}

const botoes: Botao[] = [
    {
        url: "/",
        imagem: icon_inicio,
        id: 1,        
    },
    {
        url: "/meusLivros",
        imagem: icon_meusLivros,
        id: 2,        
    },    
]

export default function TabNavigator() {

    const location = useLocation();
    const locationAtual = location.pathname;   


    return (
        <aside className='w-[110px] bg-laranjaPadrao h-screen fixed mt-[100px] flex flex-col space-y-[70px] items-center pt-[20px]'>
            {botoes.map((botao) => {
                return (
                    <NavLink key={botao.id} to={botao.url}> 
                        <img src={botao.imagem  } className={`${ botao.url == locationAtual ? ' bg-laranjaClaro px-[20px] py-[15px] border-r-[6px]  border-azulPadrao' : 'px-[20px] py-[15px]'}`}/>
                    </NavLink>
                )
            })}        
        </aside>
    )
}



