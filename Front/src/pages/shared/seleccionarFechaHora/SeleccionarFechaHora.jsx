import '../../page.css';
import './seleccionarFechaHora.css';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InfoServicio } from '../../../components/reserva/infoServicio/InfoServicio';
import { CalendarioReserva } from '../../../components/reserva/calendarioReserva/CalendarioReserva';
import { HorariosDisponibles } from '../../../components/reserva/horariosDisponibles/HorariosDisponibles';
import { useReservas } from '../../../hooks/useReservas'
import { useServicios } from '../../../hooks/useServicios';
import { Table } from '../../../components/iu/table/Table';
import { ModalInfoReserva } from '../../../components/reserva/modalInfoReserva/ModalInfoReserva';
import { Spinner } from '../../../components/iu/spinner/Spinner';
import { Modal } from '../../../components/iu/messages/Modal';
import { MessageError } from '../../../components/iu/messages/MessageError'

export const SeleccionarFechaHora = () => {
  const {
    horarios, reservas, loading, successMessage, reservaSeleccionada, reservaEnEdicion,
    fechaSeleccionada, modalReservaAbierto, obtenerHorariosDisponibles, obtenerReservasPorFecha,
    obtenerReservaPorId, reservarHorario, abrirModalInfoReserva, cerrarModalInfoReserva, limpiarMensajeExito, limpiarMensajeError } = useReservas();

  const { obtenerServicioPorId, servicioSeleccionado } = useServicios();
  const [loadingTableReservas, setLoadingTableReservas] = useState(false);
  const [errorTableReservas, setErrorTableReservas] = useState(null);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  const [errorHorarios, setErrorHorarios] = useState(null);
  const [errorReagendar, setErrorReagendar] = useState(null);

  const { accion, id } = useParams();
  const navigate = useNavigate();
  const rol = "cliente";


  //metodo que ejecuta el onchange del calendario ()
  const visualizarHorarios = async (fecha) => {

    let duracion = 0;

    if (accion === "crear") {
      duracion = servicioSeleccionado.tiempoDeDuracionMin;
    }

    if (accion === "modificar") {
      duracion = reservaEnEdicion.servicio.tiempoDeDuracionMin;
    }

    if (duracion != 0) {
      setLoadingHorarios(true);
      try {
        await obtenerHorariosDisponibles(fecha, duracion).unwrap();
        setErrorHorarios(null); // Limpio error si sale bien
      } catch (error) {
        setErrorHorarios(error);
      } finally {
        setLoadingHorarios(false);
      }
    }

    if (rol === "admin") {
      setLoadingTableReservas(true);
      try {
        await obtenerReservasPorFecha(fecha).unwrap();
        setErrorTableReservas(null); // Limpio error si sale bien
      } catch (error) {
        setErrorTableReservas(error);
      } finally {
        setLoadingTableReservas(false);
      }
    }

  }
  //Si se va a crear una reserva se busca el servicio para mostrar sus datos, si no se busca la reserva a editar que ya tiene los datos del servicio
  useEffect(() => {
    if (accion === "crear") {
      obtenerServicioPorId(id);
    }

    if (accion === "modificar") {
      obtenerReservaPorId(id);
    }

  }, []);

  useEffect(() => {
    const hoy = moment();

    if (accion === "crear" && servicioSeleccionado) {
      visualizarHorarios(hoy);
    }

    if (accion === "modificar" && reservaEnEdicion) {
      visualizarHorarios(hoy);
    }

  }, [accion, servicioSeleccionado, reservaEnEdicion]);


  const redirectInicioUsuario = () => {
    limpiarMensajeExito();

    if (rol === "admin") {
      navigate('/admin/inicio');
    }
    else {
      navigate('/cliente/inicio');
    }

  }

  const onSeleccionarHorario = async (modoReserva, horario, idServicio) => {

    if (accion === "modificar") {
      try {
        await reservarHorario(modoReserva, horario, idServicio); // ya hace unwrap
        setErrorReagendar(null);
      } catch (error) {
        setErrorReagendar(error);
      }
    }

    if (accion === "crear") {
      reservarHorario(modoReserva, horario, idServicio);
    }
  };

  //cierra el modal y actualiza los horarios
  const cerrarModalError = () => {
    limpiarMensajeError();
    visualizarHorarios(fechaSeleccionada);

  }

  const columns = [
    { header: 'Cliente', render: (dato) => dato.clienteId ? `${dato.cliente.nombre} ${dato.cliente.apellido}` : `${dato.nombreCliente} ${dato.apellidoCliente}` },
    { header: 'Celular', render: (dato) => dato.clienteId ? `${dato.cliente.celular}` : `${dato.celularCliente}` },
    { header: 'Hora', render: (dato) => dato.horaInicio?.slice(0, 5) },
    { header: 'Fecha', render: (dato) => moment(dato.fecha).format('DD/MM/YYYY') },
    { header: 'Estado de pago', render: (dato) => dato.nombreEstadoDePago }
  ];

  //FALTA AGREGAR LOS SPINER

  return (
    <div className='container_page grid-principal'>

      <div className="area-info">
        <p>Información del servicio</p>
        <InfoServicio servicio={accion === "crear" ? servicioSeleccionado : reservaEnEdicion.servicio} />
      </div>


      <div className="area-calendario">

        <div className='mesaje_error'>
          {errorHorarios && (<MessageError error={errorHorarios} />)}
        </div>

        <div className='mesaje_error'>
          {errorReagendar && (<MessageError error={errorReagendar} />)}
        </div>

        <CalendarioReserva onFechaSeleccionada={visualizarHorarios} />

      </div>

      <div className="area-horarios">
        <HorariosDisponibles horarios={horarios} seleccionarHorario={onSeleccionarHorario} modoReserva={accion} idServicio={id} loading={loadingHorarios} />
      </div>


      {rol === "admin" &&
        <div className="area-tabla">
          <p>Reservas de la fecha seleccionada</p>
          <Table columns={columns} datos={reservas} textBtn1={"Ver más"} actionBtn1={abrirModalInfoReserva} table_width={"table_big"} class_margin={"table_margin_none"} />
          {errorTableReservas && (<MessageError error={errorTableReservas} />)}
          {loadingTableReservas && <Spinner />}
        </div>
      }

      {modalReservaAbierto && <ModalInfoReserva reserva={reservaSeleccionada} alCerrar={cerrarModalInfoReserva} />}

      {successMessage && <Modal mensaje={successMessage} alCerrar={redirectInicioUsuario} />}

    </div>
  )
}
