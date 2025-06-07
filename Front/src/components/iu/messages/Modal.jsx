import React from 'react'
import './messages.css'
import {ButtonModal} from '../buttons/ButtonModal'

export const Modal = ({mensaje,alCerrar}) => {
    return (
        <div className="fondo_modal">
            <div className="contenido_modal">
                <p>{mensaje}</p>
                <ButtonModal alCerrar={alCerrar}/>
            </div>
        </div>
    )
}
