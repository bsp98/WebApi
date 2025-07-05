import React from 'react'
import { HeaderPublico } from './HeaderPublico'
import { Footer } from '../Footer'
import { Outlet } from 'react-router-dom';

export const PublicoLayout = () => {
  return (
    <>
      <HeaderPublico />
      <main className="container">
        <Outlet />
      </main>
      <Footer tipoUsuario={"publico"}/>
    </>


  )
}
