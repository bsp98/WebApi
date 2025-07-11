import React from 'react'
import moment from 'moment'
import './modalInfoReserva.css';
import { ButtonModal } from '../../../components/iu/buttons/ButtonModal'

export const ModalInfoReserva = ({ reserva, alCerrar }) => {


    if (!reserva) return null;

    return (
        <div className="fondo_modal_reserva">
            <div className="contenido_modal_reserva">

                <div className='container_info_modal_reserva'>
                    
                    <div className='infoReserva_modal'>
                        <span className='titel_modal_reserva'>Reserva</span>

                        <div className='group_info_modal_reserva'>
                            <i className='icon_modal_reserva fa-solid fa-user'></i>
                            <p className='info_modal_reserva'>{`${reserva.cliente.nombre} ${reserva.cliente.apellido}`}</p>
                        </div>

                        <div className='group_info_modal_reserva'>
                            <i className='icon_modal_reserva fa-solid fa-calendar-days'></i>
                            <p className='info_modal_reserva'>{`${moment(reserva.fecha).format('DD/MM/YYYY')}`}</p>
                        </div>

                        <div className='group_info_modal_reserva'>
                            <i className='icon_modal_reserva fa-solid fa-clock'></i>
                            <p className='info_modal_reserva'>{`${reserva.horaInicio}`}</p>
                        </div>

                        <div className='group_info_modal_reserva'>
                            <i className='icon_modal_reserva fa-solid fa-coins'></i>
                            <p className='info_modal_reserva'>{`${reserva.nombreEstadoDePago}`}</p>
                        </div>

                    </div>

                    <div className='infoReserva_modal'>
                        <span className='titel_modal_reserva'>Servicio</span>

                        <div className='group_info_modal_reserva'>
                            <i className='icon_modal_reserva fa-solid fa-star'></i>
                            <p className='info_modal_reserva'>{`${reserva.servicio.nombre}`}</p>
                        </div>

                        <div className='group_info_modal_reserva'>
                            <i className='icon_modal_reserva fa-solid fa-credit-card'></i>
                            <p className='info_modal_reserva'>{`$${reserva.servicio.precioTotal}`}</p>
                        </div>

                        <div className='group_info_modal_reserva'>
                            <i className='icon_modal_reserva fa-solid fa-stopwatch'></i>
                            <p className='info_modal_reserva'>{`${reserva.servicio.tiempoDeDuracionMin} min`}</p>
                        </div>

                    </div>

                </div>

                <ButtonModal btn_variant={"btn_primary"} width_btn={"btn_small"} alCerrar={alCerrar} />
            </div>
        </div>
    )
}
