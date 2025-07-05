import React from 'react'
import './infoServicio.css'

export const InfoServicio = ({servicio}) => {
    return (
        <div className='container_info_servicio_reserva'>

            <span className='title_info_servicio'>{servicio.nombre}</span>

            <div className='container_info_servicio'>
                <i className='icon_info_servicio fa-regular fa-star'></i>
                <p className='text_info_servicio'>{servicio.categoriaNombre}</p>
            </div>


            <div className='container_info_servicio'>
                <i className='icon_info_servicio fa-regular fa-credit-card'></i>
                <p className='text_info_servicio'>{`$${servicio.precio}`}</p>
            </div>


            <div className='container_info_servicio'>
                <i className='icon_info_servicio fa-regular fa-clock'></i>
                <p className='text_info_servicio'>{`${servicio.tiempoDeDuracionMin} min`}</p>
            </div>

        </div>
    )
}
