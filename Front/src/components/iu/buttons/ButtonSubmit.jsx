import React from 'react'
import './buttons.css'


export const ButtonSubmit = ({value, btn_variant ,width_btn = ""}) => {
  return (
    <input className={`btn_base  ${btn_variant} ${width_btn}`} type="submit" value={value} />
  )
}
