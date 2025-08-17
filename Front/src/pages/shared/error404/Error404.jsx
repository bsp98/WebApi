import React from 'react'
import './error404.css'

export const Error404 = () => {
  return (
    <div className='container_page'>
      <div className='container_mensaje_404'>
        <p className='code_status'>404</p>
        <p className='mensaje_code_status'>La página que buscas no existe o ha sido eliminada.</p>
      </div>
    </div>
  )
}
