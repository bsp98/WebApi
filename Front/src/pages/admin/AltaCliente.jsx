import React from 'react'
import '../page.css'
import { useRef, useEffect } from 'react';
import { useClientes } from '../../hooks/useClientes';
import { FormularioAltaCliente } from '../../components/cliente/formularios/FormularioAltaCliente'
import { Modal } from '../../components/iu/messages/Modal';
import { Title } from '../../components/iu/texts/Title'

export const AltaCliente = () => {
  const { agregarCliente, successMessage, limpiarMensajeExito, error } = useClientes();
  const formRef = useRef(null);

  useEffect(() => {
    if (successMessage) {
      formRef.current.reset();
    }
  }, [successMessage]);

  return (
    <div className='container_page'>

      <Title text={"Agregar cliente"} />

      <FormularioAltaCliente agregarCliente={agregarCliente} formRef={formRef} error={error} />

      {successMessage && (
        <Modal mensaje={successMessage} alCerrar={limpiarMensajeExito} />
      )}

    </div>
  )
}
