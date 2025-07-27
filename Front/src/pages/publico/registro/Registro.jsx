import React from 'react'
import './registro.css'
import { Link, useNavigate } from 'react-router-dom';
import { FormularioRegistro } from '../../../components/auth/registro/FormularioRegistro'
import logo from '../../../assets/logo/Logo.png'
import { useRef, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth'
import { Modal } from '../../../components/iu/messages/Modal';

export const Registro = () => {
  const formRef = useRef(null);
  const { error, registrarUsuario, loginGoogle, setErrorGoogle,limpiarMensajeError,successMessage,limpiarMensajeExito} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    limpiarMensajeError();
  }, []);

  const limpiarFormulario = () => {
    if (formRef) {
      formRef.current.reset();
    }
  }

  //limpia el formulario de registro cuando se sale de la pantalla
  useEffect(() => {
    return limpiarFormulario();
  }, []);


  const registroExistoso = () =>{
    limpiarMensajeExito(); 
    navigate("/login");
  }

  return (
    <div className='container_page_registro'>

      <div className='container_content_registro'>

        <Link className='container_logo_registro' to='/inicio'>
          <img className='logo_registro' src={logo} alt="Logo de la empresa"></img>
        </Link>

        <div className='container_form_registro'>
          <FormularioRegistro onSubmit={registrarUsuario} formRef={formRef} error={error} onLoginGoogle={loginGoogle} onError={setErrorGoogle} />
        </div>

      </div>

      {successMessage && (
        <Modal mensaje={successMessage} alCerrar={registroExistoso} />
      )}

    </div>
  )
}
