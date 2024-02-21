import { useState } from 'react';
import { useLogadoContext } from '@/contexts/LogadoContext';
import { api } from '@/api/api';
import { GoGear } from "react-icons/go";

interface HistoricoProps {
  historico_id: number;
  data_leitura: string;
  pagina_atual: number;
  data_meta: string;
  usuario: number;
  livro: number;
}

export default function Relatorio() {
  const { livros, usuarioID } = useLogadoContext();

  const [selectedBookId, setSelectedBookId] = useState();
  const [historicosFiltrados, setHistoricosFiltrados] = useState<HistoricoProps[]>([]);
  const [mostrarTabela, setMostrarTabela] = useState(false);

  const handleBookChange = (event: any) => {
    setSelectedBookId(event.target.value);
  };

  const formatarData = (dataString: any) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  const buscaRelatorio = () => {
    api.get("/historicos/buscar")
      .then((response) => {
        const historicos = response.data;
        const historicosDoLivro = historicos.filter((historico: HistoricoProps) => {
          return historico.livro == selectedBookId && historico.usuario == usuarioID;
        });

        const historicosFormatados = historicosDoLivro.map((historico: HistoricoProps) => {
          return {
            ...historico,
            data_meta: historico.data_meta === "2024-02-19T01:20:09.958000Z" ? "----------------" :
              historico.data_meta === "2024-02-20T23:48:40.204000Z" ? "----------------" :
                formatarData(historico.data_meta)
          };
        });
        setHistoricosFiltrados(historicosFormatados);
        setMostrarTabela(true); // Mostra a tabela após buscar o relatório
      })
      .catch((error) => {
        console.error('Erro ao buscar relatório:', error);
      });
  };

  return (
    <section>
      <div className='flex items-center mb-[35px]'>
        <GoGear className='text-[32px] text-azulPadrao' />
        <h1 className='font-bold text-[32px] text-azulPadrao ml-[8px]'>RELATÓRIO</h1>
      </div>
      <div className='flex flex-col items-center'>
        <div className='flex gap-[10px] mb-[25px]'>
          <label htmlFor="bookSelect" className='text-[22px] text-azulPadrao font-bold'>Selecione um Livro:</label>
          <select id="bookSelect" value={selectedBookId} onChange={handleBookChange} className='text-azulPadrao'>
            <option value=""></option>
            {livros.map((livro) => (
              <option key={livro.livro_id} value={livro.livro_id} className='text-azulPadrao'>
                {livro.titulo}
              </option>
            ))}
          </select>
        </div>
        <button onClick={buscaRelatorio} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Buscar Relatório</button>

        {mostrarTabela && (
          <table className="mt-[100px] border-collapse border border-gray-500">
            <thead>
              <tr>
                <th className="border border-gray-500 px-4 py-2">Data da Leitura</th>
                <th className="border border-gray-500 px-4 py-2">Página Atual</th>
                <th className="border border-gray-500 px-4 py-2">Data da Meta</th>
              </tr>
            </thead>
            <tbody>
              {historicosFiltrados.map((historico, index) => (
                <tr key={index}>
                  <td className="border border-gray-500 px-4 py-2 text-center">{formatarData(historico.data_leitura)}</td>
                  <td className="border border-gray-500 px-4 py-2 text-center">{historico.pagina_atual}</td>
                  <td className="border border-gray-500 px-4 py-2 text-center">{historico.data_meta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}