import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './login.css'
import { FormularioLogin } from '../../../components/auth/login/FormularioLogin'
import logo from '../../../assets/logo/Logo.png'
import { useRef, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth'


export const Login = () => {
  const formRef = useRef(null);
  const { error, login, loginGoogle, setErrorGoogle, usuario,limpiarMensajeError} = useAuth();
  const navigate = useNavigate();

    useEffect(() => {
    limpiarMensajeError();
  }, []);

  const limpiarFormulario = () => {
    if (formRef) {
      formRef.current.reset();
    }
  }

  //limpia el formulario de login cuando se sale de la pantalla
  useEffect(() => {
    return limpiarFormulario();
  }, []);

  useEffect(() => {
    console.log("entro al usseffect de login redirect")

    if (!usuario) return;

    if (usuario.rolUsuario === "Administrador") {
      navigate("/admin/inicio");
    } else if (usuario.rolUsuario === "Cliente") {
      navigate("/cliente/inicio");
    }

  }, [usuario]);


  return (
    <div className='container_page_login'>

      <div className='container_content_login'>

        <Link className='container_logo_login' to='/inicio'>
          <img className='logo_login' src={logo} alt="Logo de la empresa"></img>
        </Link>

        <div className='container_form_login'>
          <FormularioLogin onSubmit={login} formRef={formRef} error={error} onLoginGoogle={loginGoogle} onError={setErrorGoogle} />
        </div>

      </div>

    </div>
  )
}
