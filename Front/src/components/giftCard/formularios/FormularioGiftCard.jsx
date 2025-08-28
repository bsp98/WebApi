import React from 'react'
import './formularioGiftCard.css'
import '../../styles/formularios.css'
import { InputForm } from '../../iu/inputs/InputForm'
import { MessageError } from '../../iu/messages/MessageError'
import { ButtonSubmit } from '../../iu/buttons/ButtonSubmit'
import { TextAreaForm } from '../../iu/inputs/TextAreaForm'

export const FormularioGiftCard = ({ onSubmit, formRef, cliente = null, error }) => {
    return (
        <div className='container_form_alta_reserva'>

            <form ref={formRef} onSubmit={onSubmit}>

                <div className='container_gruop_datos'>

                    <InputForm tipo={"text"} id={"nombreComprador"} labelDescription={"Tu nombre :"} name={"nombreComprador"} placeholder={"Ingresa tu nombre"} esRequerido={true} isDisabled={cliente ? true : false} value={cliente ? cliente.nombre : ""} />

                    <InputForm tipo={"text"} id={"emailComprador"} labelDescription={"Tu email:"} name={"emailComprador"} placeholder={"Ingresa tu email"} esRequerido={true} isDisabled={cliente ? true : false} value={cliente ? cliente.email : ""} />
                </div>

                <div className='container_gruop_datos'>
                    <InputForm tipo={"text"} id={"celularComprador"} labelDescription={"Tu celular:"} name={"celularComprador"} placeholder={"Ingresa tu celular"} esRequerido={true} isDisabled={cliente ? true : false} value={cliente ? cliente.celular : ""} />

                    <InputForm tipo={"text"} id={"nombreDestinatario"} labelDescription={"Nombre del destinatario:"} name={"nombreDestinatario"} placeholder={"Nombre de quien recibirá la gift card"} esRequerido={true} />
                </div>

                <TextAreaForm id={"mensaje"} labelDescription={"Mensaje:"} name={"mensaje"} placeholder={"Escribe tu mensaje aquí..."} esRequerido={true} />


                {error && (<MessageError error={error} />)}

                <div className='container_button_solicitar'>
                    <ButtonSubmit value={"SOLICITAR"} btn_variant={"btn_primary"} width_btn='btn_small' />
                </div>

            </form>
        </div>
    )
}
