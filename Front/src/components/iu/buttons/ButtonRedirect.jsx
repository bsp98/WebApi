import React from 'react'
import './buttons.css'

export const ButtonRedirect = ({textBtn,actionRedirect}) => {
  return (
    <button className="button_redirect" onClick={actionRedirect}>{textBtn}</button>
  )
}

