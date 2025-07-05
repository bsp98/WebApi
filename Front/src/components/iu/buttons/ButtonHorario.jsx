import React from 'react'
import './buttons.css'

export const ButtonHorario = ({ textBtn, actionRedirect, modoReserva, btn_variant, width_btn = "" }) => {

  if (!textBtn) return null; // No renderiza nada

  const [hora] = textBtn.split(":");
  const intHora = parseInt(hora);



  return (
    <button type="button" className={`btn_base  ${btn_variant} ${width_btn}`} onClick={e => actionRedirect(modoReserva,textBtn)}>{intHora < 12 ? `${textBtn} AM` : `${textBtn} PM`}</button>
  )
}
