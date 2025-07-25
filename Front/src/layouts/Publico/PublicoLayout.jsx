import React from 'react'
import { HeaderPublico } from './HeaderPublico'
import { Footer } from '../Footer'
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const PublicoLayout = () => {
    const {usuario} = useAuth();
    const rol = usuario?.rolUsuario || null;
  return (
    <>
      <HeaderPublico />
      <main className="container">
        <Outlet />
      </main>
      <Footer tipoUsuario={rol}/>
    </>


  )
}
