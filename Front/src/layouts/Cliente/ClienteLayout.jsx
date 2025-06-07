import React from 'react'
import { HeaderCliente } from './HeaderCliente'
import { Footer} from '../Footer'
import { Outlet } from 'react-router-dom'; 

export const ClienteLayout = () => {
  return (
    <>
      <HeaderCliente />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>

  )
}
