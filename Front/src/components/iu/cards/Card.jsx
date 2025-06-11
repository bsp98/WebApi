import React from 'react'
import './cards.css'
import '../buttons/buttons.css'
import { ButtonCard } from '../buttons/ButtonCard'

export const Card = ({dato, action_btn}) => {
    return (

        <div className='card'>

            <div className='titel_card_group'>
                <span className='subtitle'>{dato.categoriaNombre}</span>
                <p className='text_card'>{dato.nombre}</p>
            </div>

            <span className='subtitle'>{`$${dato.precio}`}</span>

            <div className='description_card_group'>
                <p className='text_card'>{dato.descripcion}</p>

                <div className='container_time'>
                    <i className='icon_time'></i>
                    <span className='text_card'>{`${dato.tiempoDeDuracionMin} minutos`}</span>
                </div>
            </div>

            <ButtonCard textBtn={"RESERVAR"} actionRedirect={action_btn} dato={dato} btn_variant={"btn_primary"} width_btn={"btn_big"}  />

        </div>
    )
}
