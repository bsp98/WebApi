import React from 'react'
import { HeaderCliente } from './HeaderCliente'
import { Footer } from '../Footer'
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const ClienteLayout = () => {
  const { cerrarSesion, usuario } = useAuth();
  const rol = usuario?.rolUsuario || null;
  const idUsuarioAut = usuario?.idUsuario || null;

  return (
    <>
      <HeaderCliente idUsuario={idUsuarioAut} cerrarSesion={cerrarSesion} />
      <main className="container">
        <Outlet />
      </main>
      <Footer tipoUsuario={rol} />
    </>

  )
}
