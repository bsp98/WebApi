import React from 'react'
import './formularioSolicitudCodigoPassword.css'
import '../../iu/buttons/buttons.css'
import { InputForm } from '../../iu/inputs/InputForm'
import { ButtonSubmit } from '../../iu/buttons/ButtonSubmit'
import { MessageError } from '../../iu/messages/MessageError'
import { InfoBox } from '../../../components/iu/shared/InfoBox';

export const FormularioSolicitudCodigoPassword = ({ onSubmit, formRef, error }) => {
    return (
        <div className='container_form'>

            <form ref={formRef} onSubmit={onSubmit}>

                <InputForm tipo={"text"} id={"email"} labelDescription={"Email:"} name={"email"} placeholder={"Ingrese su email"} esRequerido={true} />

                {error && (<MessageError error={error} />)}

                <div className='container_buttons_form'>
                    <ButtonSubmit value={"Solicitar"} btn_variant={"btn_primary"} width_btn='btn_big' />
                </div>

                <div className="container_mensaje_info_solicitudCode">
                    <InfoBox>
                        <p className='mensaje_info_solicitudCode'>
                            Por favor ingresá el email asociado a tu cuenta.
                            Si se encuentra registrado, recibirás un código por correo electrónico
                            para restablecer tu contraseña.
                        </p>
                    </InfoBox>
                </div>

            </form>

        </div>
    )
}
