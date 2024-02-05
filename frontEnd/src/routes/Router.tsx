import Inicio from "@/features/inicio";
import MeusLivros from "@/features/meusLivros";

export const router = [
  {
    path: "/",
    element: <Inicio/>,
  },
  {
    path: "/meusLivros",
    element: <MeusLivros/>
  }  
];
