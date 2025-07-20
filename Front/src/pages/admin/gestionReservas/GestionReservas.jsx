import React from 'react'
import '../../page.css'
import './gestionReservas.css'
import moment from 'moment';
import { useEffect } from 'react'
import { Title } from '../../../components/iu/texts/Title'
import { FilterBusqueda } from '../../../components/iu/filter/FilterBusqueda'
import { useNavigate } from 'react-router-dom'
import { useReservas } from '../../../hooks/useReservas'
import { MessageError } from '../../../components/iu/messages/MessageError'
import { Spinner } from '../../../components/iu/spinner/Spinner'
import { ModalInfoReserva } from '../../../components/reserva/modalInfoReserva/ModalInfoReserva';
import { Table } from '../../../components/iu/table/Table'
import { ButtonRedirect } from '../../../components/iu/buttons/ButtonRedirect';

export const GestionReservas = () => {
  const { reservas, loading, error, obtenerReservasPorFecha, reservaSeleccionada, modalReservaAbierto, filtrarReservas, abrirModalInfoReserva, cerrarModalInfoReserva } = useReservas();
  const navigate = useNavigate();


  useEffect(() => {
    getReservasToDay();
  }, []);


  const getReservasToDay = () => {
    const fecha = moment();
    obtenerReservasPorFecha(fecha);
  };

  const realizarReserva = () => {
    navigate('/admin/servicios');
  }

  const redirectModificarReserva = (reserva) => {
    navigate(`/admin/modificar-reserva/${reserva.id}`)
  }



  const columns = [
    { header: 'Cliente', render: (dato) => dato.clienteId ? `${dato.cliente.nombre} ${dato.cliente.apellido}`: `${dato.nombreCliente} ${dato.apellidoCliente}`},
    { header: 'Celular', render: (dato) => dato.clienteId ? `${dato.cliente.celular}`: `${dato.celularCliente}` },
    { header: 'Hora', render: (dato) => dato.horaInicio?.slice(0, 5) },
    { header: 'Fecha', render: (dato) => moment(dato.fecha).format('DD/MM/YYYY') },
    { header: 'Estado de pago', render: (dato) => dato.nombreEstadoDePago }
  ];


  return (
    <div className='container_page'>

      <Title text={"Historial de reservas"} />
      <div className='container_filter_reservas'>
        <FilterBusqueda actionOnSubmit={filtrarReservas} tipoInput1={"text"} label1={"Nombre cliente:"} label2={"Fecha de reserva:"} placeHolder1={"Ingrese el nombre del cliente"} name1={"nombre"} name2={"fecha"} />
      </div>


      <Table columns={columns} datos={reservas} textBtn1={"Ver más"} textBtn2={"Modificar"} actionBtn1={abrirModalInfoReserva} actionBtn2={redirectModificarReserva} table_width={"table_medium"} class_margin={"table_margin_none"} />

      {loading && <Spinner />}

      {error && <MessageError error={error} />}

      <ButtonRedirect textBtn={"AGREGAR RESERVA"} btn_variant={"btn_primary "} width_btn={"btn_small"} actionRedirect={realizarReserva} />

      {modalReservaAbierto && <ModalInfoReserva reserva={reservaSeleccionada} alCerrar={cerrarModalInfoReserva} />}


    </div>
  )
}
