import React from 'react'
import { useParams } from 'react-router-dom'

export const CambiarPassword = () => {
  const { id } = useParams();
  alert(`este es el id del usuario${id}`)
  return (
    <div>CambiarPassword</div>
  )
}
