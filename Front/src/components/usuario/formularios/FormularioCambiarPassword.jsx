import React from 'react'
import './formularioCambiarPassword.css'
import '../../iu/buttons/buttons.css'
import { InputForm } from '../../iu/inputs/InputForm'
import { ButtonSubmit } from '../../iu/buttons/ButtonSubmit'
import { MessageError } from '../../iu/messages/MessageError'
import { InfoBox } from '../../../components/iu/shared/InfoBox';

export const FormularioCambiarPassword = ({ modificarContrasena, formRef, error }) => {
    return (
        <div className='container_form'>

            <form ref={formRef} onSubmit={modificarContrasena}>

                <InputForm tipo={"password"} id={"currentPassword"} labelDescription={"Contraseña actual:"} name={"currentPassword"} placeholder={"Ingrese su contraseña actual"} esRequerido={true} />

                <InputForm tipo={"password"} id={"newPassword"} labelDescription={"Nueva contraseña:"} name={"newPassword"} placeholder={"Ingrese la nueva contraseña"} esRequerido={true} />

                <InputForm tipo={"password"} id={"passwordRepeat"} labelDescription={"Repita la contraseña:"} name={"passwordRepeat"} placeholder={"ingrese nuevamente la nueva contraseña"} esRequerido={true} />

                <div className="mensaje_requisitos_password">
                    <InfoBox>
                        <ul className="lista_requisitos_password">
                            <li>Como mínimo <strong>6 caracteres</strong></li>
                            <li>Al menos <strong>1 letra mayúscula</strong> (A–Z)</li>
                            <li>Al menos <strong>1 letra minúscula</strong> (a–z)</li>
                            <li>Al menos <strong>1 número</strong> (0–9)</li>
                            <li>Al menos <strong>1 signo de puntuación</strong> (por ejemplo: !, ., ?, %)</li>
                            <li><strong>Sin espacios</strong> al principio ni al final</li>
                        </ul>
                    </InfoBox>
                </div>


                {error && (<MessageError error={error} />)}

                <div className='container_buttons_form'>
                    <ButtonSubmit value={"Modificar"} btn_variant={"btn_primary"} width_btn='btn_big' />
                </div>

            </form>

        </div>
    )
}
