import React from 'react'
import { HeaderCliente } from './HeaderCliente'
import { Footer } from '../Footer'
import { Outlet } from 'react-router-dom';

export const ClienteLayout = () => {

  const cerrarSesion = () => {
    alert("se cerro la sesion del usuario");
  };

  return (
    <>
      <HeaderCliente idUsuario={"1"} cerrarSesion={cerrarSesion} />
      <main className="container">
        <Outlet />
      </main>
      <Footer tipoUsuario={"cliente"} />
    </>

  )
}
