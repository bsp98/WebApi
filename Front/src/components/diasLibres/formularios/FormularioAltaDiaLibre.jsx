import React from 'react'
import './formularioAltaDiaLibre.css'
import '../../iu/buttons/buttons.css'
import { InputDateFinal } from '../../iu/inputs/InputDateFinal'
import {ButtonSubmit} from '../../iu/buttons/ButtonSubmit'
import { MessageError } from '../../iu/messages/MessageError'

export const FormularioAltaDiaLibre = ({ onSubmit, formRef,error }) => {


    return (
        <div className='container_form'>

            <form ref={formRef} onSubmit={onSubmit}>

                <InputDateFinal id={"fecha"} label={"Fecha del día no laborable:"} name={"fecha"}/>

                {error && (<MessageError error={error}/>) }
                
                <ButtonSubmit  value={"AGREGAR"} btn_variant={"btn_primary"} width_btn='btn_medium'/>

            </form>

        </div>
    )
}