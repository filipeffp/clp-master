import { useEffect, useState } from 'react';
import { useLogadoContext } from "@/contexts/LogadoContext";
import { GiWhiteBook } from "react-icons/gi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function Header() {

  const { logado, nome, setLogado, setUsuarioID, setLivros, usuarioID, setNome } = useLogadoContext();
  const [mostrarCaixa, setMostrarCaixa] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loginData = localStorage.getItem('login');
    if (loginData) {
      const { log, userID, nome } = JSON.parse(loginData);
      setLogado(log);
      setUsuarioID(userID);
      setNome(nome);       
    } else {
      console.log("Nenhum dado de login encontrado no localStorage.");
    }
  })

  const toggleCaixa = () => {
    setMostrarCaixa(!mostrarCaixa);
  };

  const fazerLogout = () => {
    setLogado(false);
    setUsuarioID(undefined);
    setLivros([]);
    localStorage.removeItem('login');
    navigate("/login");
  };

  return (
    <div className='fixed w-full h-[100px] flex items-center pl-[60px] shadow-lg z-10 bg-white gap-[5px]'>
      <GiWhiteBook className="text-azulPadrao text-[54px]" />
      <h1 className='text-[54px] text-azulPadrao'>CLP</h1>
      <div className="flex-grow" />
      {logado && usuarioID && (
        <div className="flex items-center mr-[30px] relative">
          <button onClick={toggleCaixa}>
            <MdOutlineAccountCircle className="text-azulPadrao text-[48px] ml-4 cursor-pointer" />
          </button>
          {mostrarCaixa && (
            <div className="flex flex-col absolute right-[20px] top-[50px] bg-azulPadrao text-white shadow-md border border-azulPadrao rounded-md w-[250px] h-[120px]">
              <div className="w-full h-[90px] p-4">
                <p className='text-[28px]'>Olá, {nome}!</p>
              </div>
              <div className="flex justify-end border-t border-white p-2">
                <button onClick={fazerLogout}>Sair</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}