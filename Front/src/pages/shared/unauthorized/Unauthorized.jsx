import React from 'react'
import './unauthorized.css'

export const Unauthorized = () => {
  return (
    <div className='container_page'>
      <div className='container_mensaje_401'>
        <p className='code_status'>401</p>
        <p className='mensaje_code_status'>No tienes permisos para acceder a este recurso.</p>
      </div>
    </div>
  )
}
