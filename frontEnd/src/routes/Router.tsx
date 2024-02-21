import Inicio from "@/features/inicio";
import MeusLivros from "@/features/meusLivros";
import Relatorio from "@/features/relatorio";

export const router = [
  {
    path: "/logado/inicio",
    element: <Inicio/>,
  },
  {
    path: "/logado/meusLivros",
    element: <MeusLivros/>
  },
  {
    path: "/logado/relatorio",
    element: <Relatorio/>
  }    
];
