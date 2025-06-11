import React from 'react'

export const ButtonFilter = ({option,value,action}) => {
  return (
    <button className='button_filter' onClick={e => action(value)}>{option}</button>
  )
}
