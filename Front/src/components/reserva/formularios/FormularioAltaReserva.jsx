import React from 'react'
import './formularioAltaReserva.css'
import '../../styles/formularios.css'
import { InputForm } from '../../iu/inputs/InputForm'
import { MessageError } from '../../iu/messages/MessageError'
import { ButtonSubmit } from '../../iu/buttons/ButtonSubmit'

export const FormularioAltaReserva = ({ onSubmit, formRef, cliente = null, error }) => {

    return (
        <div className='container_form_alta_reserva'>

            <form ref={formRef} onSubmit={onSubmit}>

                <InputForm tipo={"text"} id={"id"} name={"id"} isHidden={true} value={cliente ? cliente.id : ""} />

                <InputForm tipo={"text"} id={"nombre"} labelDescription={"Nombre:"} name={"nombre"} placeholder={"Ingrese su nombre"} esRequerido={true} isDisabled={cliente ? true : false} value={cliente ? cliente.nombre : ""} />

                <InputForm tipo={"text"} id={"apellido"} labelDescription={"Apellido:"} name={"apellido"} placeholder={"Ingrese su apellido"} esRequerido={true} isDisabled={cliente ? true : false} value={cliente ? cliente.apellido : ""} />

                <InputForm tipo={"text"} id={"email"} labelDescription={"Email:"} name={"email"} placeholder={"Ingrese su email"} esRequerido={true} isDisabled={cliente ? true : false} value={cliente ? cliente.email : ""} />

                <InputForm tipo={"text"} id={"celular"} labelDescription={"Celular:"} name={"celular"} placeholder={"Ingrese su celular"} esRequerido={true} isDisabled={cliente ? true : false} value={cliente ? cliente.celular : ""} />

                {error && (<MessageError error={error} />)}

                <ButtonSubmit value={"AGENDAR"} btn_variant={"btn_primary"} width_btn='btn_medium' />

            </form>
        </div>
    )
}
