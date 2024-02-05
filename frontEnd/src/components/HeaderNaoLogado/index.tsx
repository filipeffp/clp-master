import { GiWhiteBook } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

export default function HeaderNaoLogado() {
  const navigate = useNavigate();

  const handleCadastroClick = () => {
    navigate('/cadastro');
  };

  const handleEntrarClick = () => {
    navigate('/login');
  };

  return (
    <div className='fixed w-full h-[100px] flex pl-[60px] shadow-lg z-10 bg-white gap-[5px] justify-between'>
      <div className="flex items-center gap-[5px]" onClick={() => navigate('/')}>
        <GiWhiteBook className="text-azulPadrao text-[54px]"/>
        <h1 className='text-[54px] text-azulPadrao'>CLP</h1>
      </div>
      <div>

      </div>
      <div className="flex gap-[65px] mr-[150px] items-center">
        <p className="text-azulPadrao text-[16px] cursor-pointer" onClick={handleCadastroClick}>Cadastre-se</p>
        <p className="text-azulPadrao text-[16px] cursor-pointer" onClick={handleEntrarClick}>Entrar</p>
      </div>
    </div>
  )
}
