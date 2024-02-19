import { useState, createContext, useContext, useEffect, Dispatch, SetStateAction } from 'react';
import { api } from '@/api/api';
import { LivroProps } from '@/types/LivroProps';

interface LogadoContextProps {
  logado: boolean;
  setLogado: Dispatch<SetStateAction<boolean>>;
  usuarioID: any | undefined;
  setUsuarioID: Dispatch<SetStateAction<any | undefined>>;
  livros: LivroProps[];
  setLivros: Dispatch<SetStateAction<LivroProps[]>>;
  nome: string;
  setNome: Dispatch<SetStateAction<string>>;
  buscaLivrosPorUsuario: () => void;
  criaSugestoes: () => void;
  listaSugestoes: any[];
  setListaSugestoes: Dispatch<SetStateAction<any[]>>;
  ListarLivrosComMeta: () => void; // Alterado para não mais receber parâmetros
  metasDeLivros: any[];
  setMetasDeLivros: Dispatch<SetStateAction<any[]>>;
}

export const LogadoContext = createContext<LogadoContextProps>({
  logado: false,
  setLogado: () => {},
  usuarioID: undefined,
  setUsuarioID: () => {},
  livros: [],
  setLivros: () => {},
  nome: '',
  setNome: () => {},
  buscaLivrosPorUsuario: () => {},
  criaSugestoes: () => {},
  listaSugestoes: [],
  setListaSugestoes: () => {},
  ListarLivrosComMeta: () => {}, // Inicialmente uma função vazia
  metasDeLivros: [],
  setMetasDeLivros: () => {}
}); 

export function LogadoProvider({ children }: { children: React.ReactNode }) {
  const [logado, setLogado] = useState<boolean>(false);
  const [usuarioID, setUsuarioID] = useState<any | undefined>(undefined);
  const [livros, setLivros] = useState<LivroProps[]>([]);
  const [nome, setNome] = useState<string>('');
  const [listaSugestoes, setListaSugestoes] = useState<any[]>([]);
  const [metasDeLivros, setMetasDeLivros] = useState<LivroProps[]>([]); // Novo estado

  useEffect(() => {
    if (livros.length > 0) {
      criaSugestoes();
      ListarLivrosComMeta();
    }
  }, [livros]);

  const buscaLivrosPorUsuario = async () => {
    try {
      const resposta = await api.get(`/livros/buscar_usuario?usuario_id=${usuarioID}`);
      const livrosUsuario = resposta.data;
      setLivros(livrosUsuario);
      ListarLivrosComMeta();
      criaSugestoes();
    } catch (erro) {
      console.error('Erro ao buscar livros do usuário:', erro);
    }
  };

  const criaSugestoes = async () => {
    try {
      const resposta = await api.get("/livros/buscar");
      const livrosAPI = resposta.data;
      const titulosSet = new Set<string>();

      const livrosNaoRepetidos = livrosAPI.filter((livroAPI: any) => {
        if (!titulosSet.has(livroAPI.titulo)) {
          titulosSet.add(livroAPI.titulo);
          return !livros.some((livro: any) => livro.titulo === livroAPI.titulo);
        }
        return false;
      });

      const sugestoes = livrosNaoRepetidos.length >= 5 ? livrosNaoRepetidos.slice(0, 5) : livrosNaoRepetidos;
      setListaSugestoes(sugestoes);
    } catch (erro) {
      console.error("Erro ao criar sugestões de livros:", erro);
      return [];
    }
  };

  const ListarLivrosComMeta = () => {
    const filteredLivros = livros.filter(livro => livro.data_meta !== "2024-02-19T01:20:09.958000Z");
    setMetasDeLivros(filteredLivros); // Atualiza o estado metasDeLivros    
  };

  useEffect(() => {
    if (logado && usuarioID) {
      buscaLivrosPorUsuario();      
    }
  }, [logado, usuarioID]);

  return (
    <LogadoContext.Provider
      value={{
        logado,
        setLogado,
        usuarioID,
        setUsuarioID,
        livros,
        setLivros,
        nome,
        setNome,
        buscaLivrosPorUsuario,
        criaSugestoes,
        listaSugestoes,
        setListaSugestoes,
        ListarLivrosComMeta,
        metasDeLivros,
        setMetasDeLivros
      }}
    >
      {children}
    </LogadoContext.Provider>
  );
}

export function useLogadoContext() {
  return useContext(LogadoContext);
}