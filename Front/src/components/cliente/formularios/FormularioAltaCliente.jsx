import React from 'react'
import './formulariosCliente.css'
import '../../iu/buttons/buttons.css'
import { InputForm } from '../../iu/inputs/InputForm'
import {ButtonSubmit} from '../../iu/buttons/ButtonSubmit'
import { MessageError } from '../../iu/messages/MessageError'
import { InputDateFinal } from '../../iu/inputs/InputDateFinal'


export const FormularioAltaCliente = ({ agregarCliente, formRef, error }) => {

    return (
        <div className='container_form'>

            <form ref={formRef} onSubmit={agregarCliente}>

                <InputForm tipo={"text"} id={"nombre"} labelDescription={"Nombre:"} name={"nombre"} placeholder={"Ingrese el nombre del cliente"} esRequerido={true} />

                <InputForm tipo={"text"} id={"apellido"} labelDescription={"Apellido:"} name={"apellido"} placeholder={"Ingrese el apellido del cliente"} esRequerido={true} />

                <InputDateFinal id={"fechaDeNacimiento"} label={"Fecha de nacimiento"} name={"fechaDeNacimiento"}/>

                <InputForm tipo={"text"} id={"email"} labelDescription={"Email:"} name={"email"} placeholder={"Ingrese el email del cliente"} />

                <InputForm tipo={"text"} id={"celular"} labelDescription={"Celular:"} name={"celular"} placeholder={"Ingrese el celular del cliente" } esRequerido={true} />

                {error && (<MessageError error={error} />)}

                <ButtonSubmit value={"AGREGAR CLIENTE"} btn_variant={"btn_primary"} width_btn='btn_medium' />

            </form>

        </div>
    )
}


