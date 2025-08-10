import React, { useState } from 'react'
import '../page.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useRef, useEffect } from 'react';
import { Title } from '../../components/iu/texts/Title'
import { FormularioModificarReserva } from '../../components/reserva/formularios/FormularioModificarReserva'
import { Modal } from '../../components/iu/messages/Modal';
import { useReservas } from '../../hooks/useReservas';


export const ModificarReserva = () => {
  const { error, successMessage, reservaEnEdicion, eliminarReserva, modificarEstadoDePago, limpiarMensajeExito, obtenerReservaPorId } = useReservas();
  const { id } = useParams();
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [alCerrarModal,setAlCerrarModal] = useState(() => () => {});

  useEffect(() => {
    obtenerReservaPorId(id); //obtiene la reserva cuando cambia el id de la ruta
  }, [id])

  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();// resetea los datos del form cuando la reserva a editar cambio
    }
  }, [reservaEnEdicion]);

  const redirectInicioAdmin = () => {
    navigate('/admin/inicio');
  }

  const redirectSeleccionarFechaHora = () => {
    navigate(`/admin/fecha-hora/modificar/${id}`);
  }

  const cancelarReserva = () => {
    setAlCerrarModal(() => reservaCanceladaConExito);
    eliminarReserva();
  }

  const reservaCanceladaConExito = () => {
    limpiarMensajeExito();
    navigate(`/admin/inicio`);
  }

  const configurarEstadoDepago = (e) => {
    setAlCerrarModal(() => estadoDePagoModificadoConExito);

    e.preventDefault();
    const form = e.target;
    const idReserva = form.id.value;
    const estadoDePago = parseInt(form.estadoDePago.value); //devuelve un numero.
    modificarEstadoDePago(idReserva,estadoDePago);
  }

  const estadoDePagoModificadoConExito = () => {
    limpiarMensajeExito();
    obtenerReservaPorId(id);
  }

  return (
    <div className='container_page'>

      <Title text={"Modificar reserva"} />

      <FormularioModificarReserva modificarEstadoDePago={configurarEstadoDepago} reagendarReserva={redirectSeleccionarFechaHora} cancelarReserva={cancelarReserva} alCerrar={redirectInicioAdmin} formRef={formRef} error={error} reserva={reservaEnEdicion} />

      {successMessage && (
        <Modal mensaje={successMessage} alCerrar={alCerrarModal} />
      )}
    </div>
  )
}
