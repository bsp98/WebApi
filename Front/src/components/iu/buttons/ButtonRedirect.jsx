import React from 'react'
import './buttons.css'

export const ButtonRedirect = ({textBtn,actionRedirect,btn_variant ,width_btn = ""}) => {
  return (
    <button type="button" className={`btn_base  ${btn_variant} ${width_btn}`} onClick={actionRedirect}>{textBtn}</button>
  )
}

