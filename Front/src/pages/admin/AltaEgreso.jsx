import React from 'react'
import { useRef, useEffect } from 'react';
import { FormularioAltaEgreso } from '../../components/egresos/FormularioAltaEgreso';
import { Title } from '../../components/iu/texts/Title';
import { Modal } from '../../components/iu/messages/Modal';
import {useEgresos} from '../../hooks/useEgresos'


export const AltaEgreso = () => {
  const { crearEgreso, successMessage, limpiarMensajeExito, error } = useEgresos();
  const formRef = useRef(null);

  useEffect(() => {
    if (successMessage) {
      formRef.current.reset();
    }
  }, [successMessage]);

  return (
    <div className='container_page'>

      <Title text={"Agregar Egreso"} />

      <FormularioAltaEgreso crearEgreso={crearEgreso} formRef={formRef} error={error} />

      {successMessage && (
        <Modal mensaje={successMessage} alCerrar={limpiarMensajeExito} />
      )}

    </div>
  )
}
