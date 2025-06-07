import React from 'react'
import './buttons.css'

export const ButtonModal = ({alCerrar}) => {
  return (
    <button className="button_modal" onClick={alCerrar}>Cerrar</button>
  )
}
