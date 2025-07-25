import React from 'react'
import './formularioRegistro.css'
import { InputForm } from '../../iu/inputs/InputForm'
import { InputDateFinal } from '../../iu/inputs/InputDateFinal'
import { MessageError } from '../../iu/messages/MessageError'
import { ButtonSubmit } from '../../iu/buttons/ButtonSubmit'
import { Link } from 'react-router-dom';

export const FormularioRegistro = ({ onSubmit, formRef, error}) => {
    return (
        <div className='container_content_form_registro'>

            <form ref={formRef} onSubmit={onSubmit}>

                <div className='container_grup_input'>
                    <InputForm tipo={"nombre"} id={"nombre"} labelDescription={"Nombre:"} name={"nombre"} placeholder={"Ingrese su nombre"} esRequerido={true} />

                    <InputForm tipo={"apellido"} id={"apellido"} labelDescription={"Apellido:"} name={"apellido"} placeholder={"Ingrese su apellido"} esRequerido={true} />
                </div>

                <div className='container_grup_input'>
                    <InputForm tipo={"celular"} id={"celular"} labelDescription={"Celular:"} name={"celular"} placeholder={"Ingrese su celular"} esRequerido={true} />

                    <InputDateFinal id={"fechaDeNacimiento"} label={"Fecha de nacimiento"} name={"fechaDeNacimiento"} />
                </div>

                <InputForm tipo={"email"} id={"email"} labelDescription={"Email:"} name={"email"} placeholder={"Ingrese su email"} esRequerido={true} />

                <div className='container_grup_input'>
                    <InputForm tipo={"password"} id={"password"} labelDescription={"Contraseña:"} name={"password"} placeholder={"Ingrese su contraseña"} esRequerido={true} />

                    <InputForm tipo={"password"} id={"passwordRepeat"} labelDescription={"Repetir contraseña:"} name={"passwordRepeat"} placeholder={"Repita su contraseña"} esRequerido={true} />
                </div>

                <div className="container_politicas">
                    <input className="check_box_politicas" type="checkbox" name={"politicas"} defaultChecked={false} />
                    <div className="grupo-link-politicas">
                        Acepto los
                        <Link to="/terminos" className="link_politica">Términos y Condiciones</Link>
                        y la
                        <Link to="/privacidad" className="link_politica">Política de Privacidad</Link>
                    </div>
                </div>


                {error && (<MessageError error={error} />)}

                <div className='grupo_buttons'>
                    <ButtonSubmit value={"REGISTRARSE"} btn_variant={"btn_primary"} width_btn='btn_big' />
                </div>
            </form>
        </div>
    )
}
