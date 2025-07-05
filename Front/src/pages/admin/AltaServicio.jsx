import React from 'react'
import '../page.css'
import { useServicios } from '../../hooks/useServicios';
import { useRef, useEffect } from 'react';
import { FormularioAltaServicio } from '../../components/servicio/formularios/FormularioAltaServicio';
import { Modal } from '../../components/iu/messages/Modal';
import {Title} from '../../components/iu/texts/Title'

export const AltaServicio = () => {

  const { crearServicio, successMessage, limpiarMensajeExito, error } = useServicios();
  const formRef = useRef(null);

  useEffect(() => {
    if (successMessage) {
      formRef.current.reset();
    }
  }, [successMessage]);

  return (
    <div className='container_page'>

      <Title text={"Agregar servicio"}/>

      <FormularioAltaServicio crearServicio={crearServicio} formRef={formRef} error={error} />

      {successMessage && (
        <Modal mensaje={successMessage} alCerrar={limpiarMensajeExito} />
      )}

    </div>
  )
}
