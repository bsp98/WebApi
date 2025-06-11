import React from 'react'
import './messages.css'
import '../buttons/buttons.css'
import '../buttons/buttons.css'
import {ButtonModal} from '../buttons/ButtonModal'

export const Modal = ({mensaje,alCerrar}) => {
    return (
        <div className="fondo_modal">
            <div className="contenido_modal">
                <p>{mensaje}</p>
                <ButtonModal btn_variant={"btn_primary"} width_btn={"btn_small"} alCerrar={alCerrar}/>
            </div>
        </div>
    )
}
