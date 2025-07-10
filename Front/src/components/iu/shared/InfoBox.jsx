import React from 'react'
import './infoBox.css'

export const InfoBox = ({children}) => {
  return (
    <div className='container_infoBox'>
      {children}
    </div>
  )
}
