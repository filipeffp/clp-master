import Header from "@/components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/api";

export default function Cadastro() {

  const [email, setEmail] = useState("")
  const [nome, setNome] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("")
  const navigate = useNavigate();

  const criarNovoUsuario = async() => {

    const dadosDoUsuario = {
      nome: nome,
      email: email,
      senha: senha
    }

    try {      
      const resposta = await api.post("/usuarios/criar", dadosDoUsuario);
      console.log(resposta.data);      
      alert("Email cadastrado com sucesso!");      
      navigate("/login");
    } catch (erro) {
      // Se ocorrer um erro, você pode tratá-lo aqui, se necessário
      console.error("Erro ao criar usuário:", erro);
      throw erro; // Você pode optar por relançar o erro para que seja tratado em outro lugar
    }
  };

  const digitaEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const digitaSenha = (event: any) => {
    setSenha(event.target.value);
  };

  const digitaNome = (event: any) => {
    setNome(event.target.value);
  };

  const digitaConfirmacaoSenha = (event: any) => {
    setConfirmacaoSenha(event.target.value);
  };

  const navegarParaLogin = () => {    
    navigate("/Login");
  };

  const cadastrar = () => {    
    if (senha !== confirmacaoSenha) {
      alert("As senhas não coincidem.");
      return;
    }    

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um email válido.");
      return;
    }

    criarNovoUsuario();    

  };

  return (
    <>
      <Header />
      <section className="flex items-center justify-center h-screen ">
        <div className="text-center flex flex-col gap-[15px] border border-azulPadrao rounded-lg p-6 items-center w-[367px] shadow-md shadow-[#add8e6]">
          <h1 className="font-bold text-[32px] text-azulPadrao">Sistema de Cadastro</h1>

          <input
            type="text"
            value={nome}
            onChange={digitaNome}
            placeholder="Nome"
            className="border p-2 w-full"
          />

          <input
            type="text"
            value={email}
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

          <input
            type="password"
            value={confirmacaoSenha}
            onChange={digitaConfirmacaoSenha}
            placeholder="Confirmar Senha"
            className="border p-2 w-full"
          />

          <button
            className="bg-azulPadrao text-white px-4 py-2 rounded w-full"
            onClick={cadastrar}
          >
            Cadastrar
          </button>
          <div className="flex gap-[4px]">
            <p className="text-cinzaEscuro">Já tem uma conta? </p>
            <p className="text-azulPadrao cursor-pointer" onClick={navegarParaLogin}>Entre</p>
          </div>
        </div>
      </section>
    </>
  )
}
