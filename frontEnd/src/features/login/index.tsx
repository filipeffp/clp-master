import Header from "@/components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")
  const navigate = useNavigate();

  const digitaEmail = (event:any) => {
    setUsuario(event.target.value);
  };

  const digitaSenha = (event:any) => {
    setSenha(event.target.value);
  };

  const navegarParaCadastro = () => {    
    navigate("/cadastro");
  };

  const Entrar = () => {    
    navigate("/");
  };

  return (
    <>
      <Header/>
      <section className="flex items-center justify-center h-screen ">
        <div className="text-center flex flex-col gap-[15px] border border-azulPadrao rounded-lg p-6 items-center w-[367px] shadow-md shadow-[#add8e6]">
          <h1 className="font-bold text-[32px] text-azulPadrao">Sistema de Login</h1>

           <input
            type="text"
            value={usuario}
            onChange={digitaEmail}
            placeholder="Email"
            className="border p-2 w-full"
          />

          <input
            type="password"
            value={senha}
            onChange={digitaSenha}
            placeholder="Senha"
            className="border p-2 w-full"
          />

          <button onClick={Entrar} className="bg-azulPadrao text-white px-4 py-2 rounded w-full">Entrar</button>
          <div className="flex gap-[4px]">
            <p className="text-cinzaEscuro">Não tem uma conta? </p>
            <p className="text-azulPadrao cursor-pointer" onClick={navegarParaCadastro}>Cadastre-se</p>
          </div>
        </div>
      </section>
    </>
  )
}
