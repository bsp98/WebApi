import React from 'react'
import '../page.css'
import { useDiasLibres } from '../../hooks/useDiasLibres';
import { useRef, useEffect } from 'react';
import { FormularioAltaDiaLibre } from '../../components/diasLibres/formularios/FormularioAltaDiaLibre';
import { Modal } from '../../components/iu/messages/Modal';
import {Title} from '../../components/iu/texts/Title'

export const AltaDiaLibre = () => {

  const { agregarDiaLibre, successMessage, limpiarMensajeExito, error } = useDiasLibres();
  const formRef = useRef(null);

  useEffect(() => {
    if (successMessage) {
      formRef.current.reset();
    }
  }, [successMessage]);

  return (
    <div className='container_page'>

      <Title text={"Agregar día libre"}/>

      <FormularioAltaDiaLibre onSubmit={agregarDiaLibre} formRef={formRef} error={error} />

      {successMessage && (
        <Modal mensaje={successMessage} alCerrar={limpiarMensajeExito} />
      )}

    </div>
  )
}