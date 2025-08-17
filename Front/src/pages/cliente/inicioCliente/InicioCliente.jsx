import '../../page.css';
import './inicioCliente.css';
import moment from 'moment';
import { useReservas } from '../../../hooks/useReservas'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Title } from '../../../components/iu/texts/Title';
import { Table } from '../../../components/iu/table/Table';
import { Modal } from '../../../components/iu/messages/Modal';
import { MessageError } from '../../../components/iu/messages/MessageError';
import { Spinner } from '../../../components/iu/spinner/Spinner';
import { ButtonRedirect } from '../../../components/iu/buttons/ButtonRedirect'
import { useAuth } from '../../../hooks/useAuth';

export const InicioCliente = () => {
  const { reservas, error, successMessage, loading, eliminarReserva, limpiarMensajeExito, setReservaParaCancelar, obtenerReservasPorIdCliente } = useReservas();
  const [menssageConfirmation, setMessageConfirmation] = useState(null);
  const {usuario} = useAuth();
  const navigate = useNavigate();
  const idClienteAut = usuario?.idUsuario || null;

  useEffect(() => {
    obtenerReservasPorIdCliente(idClienteAut)
  }, [idClienteAut]);

  useEffect(() => {
  if (successMessage) {
    obtenerReservasPorIdCliente(idClienteAut);
  }
}, [successMessage]);

  const redirectSeleccionarFechaHora = (reserva) => {
    navigate(`/cliente/fecha-hora/modificar/${reserva.id}`);
  }

  const redirectServicios = () => {
    navigate(`/cliente/servicios`);
  }

  const solicitarCancelacionReserva = (reserva) => {
    setReservaParaCancelar(reserva);
    setMessageConfirmation("¿Estás seguro de que querés cancelar esta reserva?");
  }

  const cancelarReserva = () => {
    eliminarReserva();
    setMessageConfirmation(null);
  }

  const cerrarModalConfirmacion = () =>{
        setMessageConfirmation(null);
  }

  const deshabilitarReagenda = (reserva) => {
  const fechaReserva = moment(reserva.fecha).startOf('day');
  const hoy = moment().startOf('day');
  return fechaReserva.diff(hoy, 'hours') < 24;
};

  const columns = [
    { header: 'Servicio', render: (dato) => `${dato.servicio.nombre}` },
    { header: 'Duracion', render: (dato) => dato.servicio.tiempoDeDuracionMin },
    { header: 'Fecha', render: (dato) => moment(dato.fecha).format('DD/MM/YYYY') },
    { header: 'Hora', render: (dato) => dato.horaInicio.slice(0,5) },
    { header: 'Estado de pago', render: (dato) => dato.nombreEstadoDePago },
    { header: 'Precio', render: (dato) => dato.precioTotal }
  ];

  //corroborar el tema de que cuando la tabla se va actualiza osea esta en loading una peticion no mostrarla.
  return (
    <div className='containter_page'>

      <div className='container_content_bienvenida'>
        <Title text={"Bienvenida"} modifyStyle={"title_h1--no-botton"} />
        <p className='panel_description'>
          Bienvenida a tu panel de usuario desde aquí
          podés gestionar tus reservas de forma simple y rápida.
          Vas a poder cancelar o reprogramar una reserva según tu preferencia,
          revisar su estado y acceder fácilmente a todos los detalles asociados.
        </p>
      </div>

      <div className='container_table--reservas-cliente'>
        <p>Tus reservas actuales</p>
        <Table columns={columns} datos={reservas} textBtn1={"Reagendar"} textBtn2={"Cancelar"} actionBtn1={redirectSeleccionarFechaHora} actionBtn2={solicitarCancelacionReserva} table_width={"table_big"} class_margin={"table_margin_none"} deshabilitarBtn1={deshabilitarReagenda} />
        {error && <MessageError error={error} />}
        {loading && <Spinner />}
      </div>

      <ButtonRedirect textBtn={"Reservar"} actionRedirect={redirectServicios} btn_variant={"btn_primary"} width_btn='btn_small' />



      {menssageConfirmation && <Modal mensaje={menssageConfirmation} alCerrar={cerrarModalConfirmacion} onConfirmar={cancelarReserva} textoConfirmar={"Confirmar"} />}

      {successMessage && <Modal mensaje={successMessage} alCerrar={limpiarMensajeExito} />}

    </div>
  )
}
