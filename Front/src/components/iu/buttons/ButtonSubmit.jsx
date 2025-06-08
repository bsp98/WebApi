import React from 'react'
import './buttons.css'


export const ButtonSubmit = ({value}) => {
  return (
    <input className='button_Submit' type="submit" value={value} />
  )
}
