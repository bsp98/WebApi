import { Link } from 'react-router-dom';
import { ButtonSubmit } from '../../iu/buttons/ButtonSubmit';
import { MessageError } from '../../iu/messages/MessageError';
import { InputForm } from '../../iu/inputs/InputForm';
import './formularioLogin.css'
import { GoogleLogin } from '@react-oauth/google';

export const FormularioLogin = ({ onSubmit, formRef, error, onLoginGoogle, onError }) => {


    return (
        <div className='container_content_form_login'>

            <form ref={formRef} onSubmit={onSubmit}>

                <InputForm tipo={"email"} id={"email"} labelDescription={"Email:"} name={"email"} placeholder={"Ingrese su email"} esRequerido={true} />

                <InputForm tipo={"password"} id={"password"} labelDescription={"Contraseña:"} name={"password"} placeholder={"Ingrese su contraseña"} esRequerido={true} />

                <div className='container_form_controls'>

                    <div className="container_enlaces_auth">
                        <div className="grupo-crear-cuenta">
                            <p>¿No tiene una cuenta?</p>
                            <Link className="link-crear" to="/registro">Cree una</Link>
                        </div>

                        <div className="grupo-olvidar-contrasena">
                            <Link className="link-olvidar" to="/recuperar-contrasena">¿Olvidaste tu contraseña?</Link>
                        </div>
                    </div>

                    {error && (<MessageError error={error} />)}

                    <div className='grupo_buttons'>
                        <ButtonSubmit value={"INICIAR SESIÓN"} btn_variant={"btn_primary"} width_btn='btn_big' />
                        <div className='button_google'>
                            <GoogleLogin onSuccess={(credentialResponse) => onLoginGoogle(credentialResponse)} onError={() => onError()} />
                        </div>
                    </div>

                </div>


            </form>
        </div>
    )
}