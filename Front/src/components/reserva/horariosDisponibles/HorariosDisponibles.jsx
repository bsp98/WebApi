import React from 'react'
import './horariosDisponibles.css'
import { ButtonHorario } from '../../iu/buttons/ButtonHorario'
import { Spinner } from '../../iu/spinner/Spinner'

export const HorariosDisponibles = ({ horarios,seleccionarHorario,modoReserva,loading }) => {
  return (
    <div className='container_horarios_disponibles'>

      {loading ? (<Spinner />) : (
        horarios.length > 0 ? (
          horarios.map((hora, index) =>(
            <ButtonHorario key={index} textBtn={hora.horaInicio} actionRedirect={seleccionarHorario} modoReserva={modoReserva} btn_variant={"btn_tertiary"} width_btn={"btn_small"}/>
          ))
        ) : (
          <p>No hay horarios disponibles</p>
        )
      )}

    </div>
  );
};