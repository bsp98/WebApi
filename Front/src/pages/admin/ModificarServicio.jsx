import React from 'react'
import '../page.css'
import { useServicios } from '../../hooks/useServicios';
import { useParams } from 'react-router-dom'
import { useRef, useEffect } from 'react';
import { FormularioModificarServicio } from '../../components/servicio/formularios/FormularioModificarServicio';
import { Modal } from '../../components/iu/messages/Modal';
import { Title } from '../../components/iu/texts/Title'


export const ModificarServicio = () => {
  const { modificarServicio, obtenerServicioPorId, successMessage, limpiarMensajeExito, error, servicioSeleccionado} = useServicios();
  const { id } = useParams();
  const formRef = useRef(null);


  useEffect(() => {
    obtenerServicioPorId(id); //obtiene el servicio cuando cambia el id de la ruta
  }, [id])

  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();// resetea los datos del form cuando el servicio seleccionado cmabio
    }
  }, [servicioSeleccionado]);



  return (
    <div className='container_page'>

      <Title text={"Modificar servicio"} />

      <FormularioModificarServicio modificarServicio={modificarServicio} formRef={formRef} error={error} servicio={servicioSeleccionado}  />

      {successMessage && (
        <Modal mensaje={successMessage} alCerrar={limpiarMensajeExito} />
      )}
    </div>
  )
}
