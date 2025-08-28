import { Link } from 'react-router-dom';
import { ButtonSubmit } from '../../iu/buttons/ButtonSubmit';
import { MessageError } from '../../iu/messages/MessageError';
import { InputForm } from '../../iu/inputs/InputForm';
import './formularioLogin.css'
import { GoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect } from 'react';

export const FormularioLogin = ({ onSubmit, formRef, error, onLoginGoogle, onError }) => {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
                        {/* <div className='button_google'>
                            <GoogleLogin onSuccess={(credentialResponse) => onLoginGoogle(credentialResponse)} onError={() => onError()} />
                        </div>*/}
                        <GoogleLogin
                            onSuccess={(credentialResponse) => onLoginGoogle(credentialResponse)}
                            onError={onError}
                            render={(renderProps) => (
                                <button
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    style={{
                                        fontSize: isMobile ? "1.2rem" : "1.8rem",
                                        padding: isMobile ? "8px 5px" : "12px 8px",
                                        borderRadius: "0.8rem",
                                        backgroundColor: "#4285F4",
                                        color: "white",
                                        border: "none",
                                        cursor: renderProps.disabled ? "not-allowed" : "pointer",
                                    }}
                                >
                                    Entrar con Google
                                </button>
                            )}
                        />
                    </div>



                </div>


            </form>
        </div>
    )
}