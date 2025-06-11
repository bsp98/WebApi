import React from 'react'
import '../page.css'
import '../../components/iu/hero/Hero'
import { Hero } from '../../components/iu/hero/Hero'
import { Filter } from '../../components/iu/filter/Filter'
import { Spinner } from '../../components/iu/spinner/Spinner'
import { useServicios } from '../../hooks/useServicios';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageError } from '../../components/iu/messages/MessageError'
import { ContainerCards } from '../../components/iu/cards/ContainerCards'

export const Servicios = () => {
  const { error, servicios, loading,obtenerTodosLosServicios, serviciosPorCategoria} = useServicios();
  const navigate = useNavigate();

  useEffect(() => {
    obtenerTodosLosServicios();
  }, []);

  const realizarReserva = (servicio) => {
    navigate(`/cliente/fecha-hora/${servicio.id}`)
  }

  const optionsFilter = [
    { name: "TODOS", value: 0 },
    { name: "UÑAS", value: 1 },
    { name: "PESTAÑAS", value: 2 },
    { name: "CEJAS", value: 3 },
    { name: "PIES", value: 4 },
    { name: "PROMOS", value: 5 }
  ]

  return (
    <div className='container_page'>
      <Hero textHero={"SERVICIOS"} />

      <Filter optionFilter={optionsFilter} onFilter={serviciosPorCategoria}/>

      <ContainerCards data={servicios} action_btn={realizarReserva}/>

      {loading && <Spinner />}

      {error && (<MessageError error={error} />)}

    </div>
  )
}
