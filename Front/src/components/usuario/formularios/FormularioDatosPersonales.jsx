import React from 'react'
import './formularioDatosPersonales.css'
import '../../styles/formularios.css'
import { ButtonSubmit } from '../../iu/buttons/ButtonSubmit'
import { InputForm } from '../../iu/inputs/InputForm'
import { MessageError } from '../../iu/messages/MessageError'

export const FormularioDatosPersonales = ({ onSubmit, formRef, error }) => {
    return (
        <div className='container_form'>

            <form ref={formRef} onSubmit={onSubmit}>

                <InputForm tipo={"text"} id={"nombre"} labelDescription={"Nombre:"} name={"nombre"} placeholder={"Ingrese su nombre"} esRequerido={true} />

                <InputForm tipo={"text"} id={"apellido"} labelDescription={"Apellido:"} name={"apellido"} placeholder={"Ingrese su apellido"} esRequerido={true} />

                <InputForm tipo={"text"} id={"celular"} labelDescription={"Celular:"} name={"celular"} placeholder={"Ingrese su celular"} esRequerido={false} />

                {error && (<MessageError error={error} />)}

                <div className='container_buttons_form'>
                    <ButtonSubmit value={"MODIFICAR"} btn_variant={"btn_primary"} width_btn='btn_big' />
                </div>

            </form>

        </div>
    )
}
