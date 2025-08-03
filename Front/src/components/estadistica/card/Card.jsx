import React from 'react'
import './card.css';

export const Card = ({type,monto,colorStyle =""}) => {
  return (
    <div className='container_card_estadistica'>
        <p className='card_type_monto'>{type}</p>
        <p className={`card_monto ${colorStyle}`}>${monto}</p>
    </div>
  )
}
