import React from 'react'
import { HeaderCliente } from './HeaderCliente'
import { Footer } from '../Footer'
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const ClienteLayout = () => {
  const {cerrarSesion}= useAuth();

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
