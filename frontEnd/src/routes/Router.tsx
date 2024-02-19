import Inicio from "@/features/inicio";
import MeusLivros from "@/features/meusLivros";

export const router = [
  {
    path: "/logado/inicio",
    element: <Inicio/>,
  },
  {
    path: "/logado/meusLivros",
    element: <MeusLivros/>
  }  
];
