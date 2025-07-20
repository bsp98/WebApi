import React from 'react'
import './buttons.css'

export const ButtonModal = ({textButton,alCerrar, btn_variant ,width_btn = ""}) => {
  return (
    <button className={`btn_base  ${btn_variant} ${width_btn}`} onClick={alCerrar}>{textButton}</button>
  )
}
