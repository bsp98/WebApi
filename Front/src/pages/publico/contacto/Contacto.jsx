import React from 'react'
import { Hero } from '../../../components/iu/hero/Hero'
import { FormularioContacto } from '../../../components/contacto/formularios/FormularioContacto'
import { useRef, useEffect } from 'react';
import { Modal } from '../../../components/iu/messages/Modal';
import { useNotificacion } from '../../../hooks/useNotificacion';
import './contacto.css'

export const Contacto = () => {
  const { enviarMensajeContacto, successMessage, limpiarMensajeExito, error } = useNotificacion();
  const formRef = useRef(null);

  useEffect(() => {
    if (successMessage) {
      formRef.current.reset();
    }
  }, [successMessage]);

  return (
    <div className='container_page'>

      <Hero textHero={"CONTACTO"} />

      <div className='container_content_contacto'>

        <div className='content_info_contacto'>

          <p className='title_content_contacto'>Información de contacto</p>

          <div className='gruop_info_contacto'>
            <i className='icon_info_contacto fa-solid fa-location-dot'></i>
            <div className='gruop_text_contacto'>
              <p className='title_info_contacto'>Dirección</p>
              <p className='text_info_contacto'>18 de Julio 1978</p>
            </div>
          </div>

          <div className='gruop_info_contacto'>
            <i className='icon_info_contacto fa-solid fa-phone'></i>
            <div className='gruop_text_contacto'>
              <p className='title_info_contacto'>Teléfono</p>
              <p className='text_info_contacto'>+598 93 889 014</p>
            </div>
          </div>

          <div className='gruop_info_contacto'>
            <i className='icon_info_contacto fa-solid fa-envelope'></i>
            <div className='gruop_text_contacto'>
              <p className='title_info_contacto'>Email</p>
              <p className='text_info_contacto'>ctvwapawapisima@gmail.com</p>
            </div>
          </div>

          <div className='gruop_info_contacto'>
            <i className='icon_info_contacto fa-regular fa-clock'></i>
            <div className='gruop_text_contacto'>
              <p className='title_info_contacto'>Horario</p>
              <p className='text_info_contacto'>Lunes a Viernes: 8:00 - 18:00</p>
              <p className='text_info_contacto'>Sabados: 9:00 - 16:00</p>
            </div>
          </div>

        </div>

        <div className='content_formulario_contacto'>

          <div className='title_formulario_contacto'>
            <p>Envíanos un mensaje</p>
          </div>
          
          <FormularioContacto onSubmit={enviarMensajeContacto} formRef={formRef} error={error} />
        </div>

      </div>

      {successMessage && (
        <Modal mensaje={successMessage} alCerrar={limpiarMensajeExito} />
      )}

    </div>
  )
}
