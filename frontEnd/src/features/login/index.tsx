import { api } from "@/api/api";
import Header from "@/components/Header";
import { useLogadoContext } from "@/contexts/LogadoContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const { logado, usuarioID, setLogado, setUsuarioID, buscaLivrosPorUsuario, setNome, nome} = useLogadoContext();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();  

  useEffect(() => {
    if (logado && usuarioID) {
      // Após o login bem-sucedido, buscar os livros do usuário e criar sugestões
      buscaLivrosPorUsuario();           
      // Armazenar no localStorage
      localStorage.setItem('login', JSON.stringify({ log: true, userID: usuarioID, nome: nome }));      
      // Redirecionar para a página de início
      navigate("/logado/inicio");
    }
  }, [logado, usuarioID]);

  const verificarLogin = async () => {
    try {
      const resposta = await api.get("/usuarios/buscar");
      const usuarios = resposta.data;

      // Verificando se há um usuário com o email fornecido
      const usuarioEncontrado = usuarios.find((user: any) => user.email === email);

      if (usuarioEncontrado) {
        // Se o usuário foi encontrado, verifica se a senha corresponde
        if (usuarioEncontrado.senha === senha) {
          // Se as credenciais estão corretas, seta logado como true e define o ID do usuário          
          setUsuarioID(usuarioEncontrado.usuario_id);               
          setLogado(true);
          setNome(usuarioEncontrado.nome);          
        } else {
          // Se a senha estiver incorreta, pode mostrar uma mensagem de erro
          alert("Senha incorreta");
        }
      } else {
        // Se o usuário não foi encontrado, pode mostrar uma mensagem de erro ou lidar com isso de outra forma
        alert("Email não encontrado");
      }
    } catch (erro) {
      // Lidar com erros da requisição
      console.error("Erro ao buscar usuários:", erro);
    }

  }

  const digitaEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const digitaSenha = (event: any) => {
    setSenha(event.target.value);
  };

  const navegarParaCadastro = () => {
    navigate("/cadastro");
  };

  const Entrar = () => {
    verificarLogin();
  };

  return (
    <>
      <Header />
      <section className="flex items-center justify-center h-screen ">
        <div className="text-center flex flex-col gap-[15px] border border-azulPadrao rounded-lg p-6 items-center w-[367px] shadow-md shadow-[#add8e6]">
          <h1 className="font-bold text-[32px] text-azulPadrao">Sistema de Login</h1>

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