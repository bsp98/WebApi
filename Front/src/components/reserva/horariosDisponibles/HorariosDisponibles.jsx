import React from 'react'
import './horariosDisponibles.css'
import { ButtonHorario } from '../../iu/buttons/ButtonHorario'
import { Spinner } from '../../iu/spinner/Spinner'

export const HorariosDisponibles = ({ horarios, seleccionarHorario, modoReserva, idServicio, loading }) => {
  return (
    <div className='container_horarios_disponibles'>

      {loading ? (<div className='container_spiner_horarios'><Spinner /></div>) : (
        horarios.length > 0 ? (
          horarios.map((hora, index) => (
            <ButtonHorario key={index} textBtn={hora.horaInicio} actionRedirect={seleccionarHorario} modoReserva={modoReserva} idServicio={idServicio} btn_variant={"btn_tertiary"} width_btn={"btn_small"} />
          ))
        ) : (
          <div className='container_sinHorarios'>
            <p>No hay horarios disponibles</p>
          </div>)
      )}

    </div>
  );
};