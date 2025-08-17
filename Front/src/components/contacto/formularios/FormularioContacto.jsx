import React from 'react'
import './formularioContacto.css'
import { ButtonSubmit } from '../../iu/buttons/ButtonSubmit'
import { InputForm } from '../../iu/inputs/InputForm'
import { TextAreaForm } from '../../iu/inputs/TextAreaForm'
import { MessageError } from '../../iu/messages/MessageError'

export const FormularioContacto = ({ onSubmit, formRef, error }) => {

    return (
        <div className='container_form_contacto'>

            <form ref={formRef} onSubmit={onSubmit}>

                <InputForm tipo={"text"} id={"nombre"} labelDescription={"Nombre:"} name={"nombre"} placeholder={"Ingrese su nombre"} esRequerido={true} />

                <InputForm tipo={"text"} id={"apellido"} labelDescription={"Apellido:"} name={"apellido"} placeholder={"Ingrese su apellido"} esRequerido={true} />

                <InputForm tipo={"text"} id={"telefono"} labelDescription={"Teléfono:"} name={"telefono"} placeholder={"Ingrese su teléfono"} esRequerido={true} />

                <InputForm tipo={"text"} id={"email"} labelDescription={"Email:"} name={"email"} placeholder={"Ingrese su email"} esRequerido={true} />

                <TextAreaForm id={"mensaje"} labelDescription={"Mensaje:"} name={"mensaje"} placeholder={"Escribe tu mensaje aquí..."} esRequerido={true} />

                {error && (<MessageError error={error} />)}

                <ButtonSubmit value={"ENVIAR MENSAJE"} btn_variant={"btn_primary"} width_btn='btn_medium' />

            </form>

        </div>
    )
}
