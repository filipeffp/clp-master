import React from "react";
import { Route, Routes } from "react-router-dom";
import { router } from "./Router";
import { Dialog } from "@/components/ui/dialog";
import App from "../App";
import { ModalProvider, useModalContext } from "@/contexts/ModalContext";
import Login from "@/features/login";
import Cadastro from "@/features/cadastro";
import BemVindo from "@/features/bemVindo";
import { LogadoProvider } from "@/contexts/LogadoContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const PublicComponent = ({ element }: any) => {
  const { modalOpen, setModalOpen } = useModalContext()

  return (
    <Dialog
      open={modalOpen}
      onOpenChange={(modal) => {
        setModalOpen(modal)
      }}
    >
      {element}
    </Dialog>
  );
};

export default function AppRoutes() {
  return (
    <LogadoProvider>
      <ModalProvider>
        <Routes>
          <Route path="/" element={<BemVindo />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logado" element={<App />}>
            {router.map((route: { path: string; element: React.JSX.Element }) => (
              <Route
                path={route.path}
                element={<PublicComponent element={route.element} />}
                key={route.path}
              />
            ))}
          </Route>
        </Routes>
      </ModalProvider>
    </LogadoProvider>
  );
}
