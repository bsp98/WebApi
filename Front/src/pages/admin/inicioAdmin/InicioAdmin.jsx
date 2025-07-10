import '../../page.css'
import './inicioAdmin.css'
import moment from 'moment';
import { Title } from '../../../components/iu/texts/Title'
import { useReservas } from '../../../hooks/useReservas'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageError } from '../../../components/iu/messages/MessageError'
import { Spinner } from '../../../components/iu/spinner/Spinner'
import { ModalInfoReserva } from '../../../components/reserva/modalInfoReserva/ModalInfoReserva';
import { Table } from '../../../components/iu/table/Table'
import { ButtonRedirect } from '../../../components/iu/buttons/ButtonRedirect';

export const InicioAdmin = () => {
  const { reservaSeleccionada, modalReservaAbierto, obtenerReservasPorFecha, abrirModalInfoReserva, cerrarModalInfoReserva } = useReservas();
  const [reservasHoy, setReservasHoy] = useState([]);
  const [reservasManana, setReservasManana] = useState([]);
  const [loadingReservasHoy, setLoadingReservasHoy] = useState(false);
  const [loadingReservasManana, setLoadingReservasManana] = useState(false);
  const [errorHoy, setErrorHoy] = useState(null);
  const [errorManana, setErrorManana] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getReservasToDay();
  }, []);

  useEffect(() => {
    getReservasToMorrow();
  }, []);;

const getReservasToDay = async () => {
  setLoadingReservasHoy(true);
  try {
    const fecha = moment();
    const reservas = await obtenerReservasPorFecha(fecha).unwrap();
    setReservasHoy(reservas);
    setErrorHoy(null); // Limpio error si sale bien
  } catch (error) {
    setErrorHoy(error);
  } finally {
    setLoadingReservasHoy(false);
  }
};

const getReservasToMorrow = async () => {
  setLoadingReservasManana(true);
  try {
    const fecha = moment().add(1, 'day');
    const reservas = await obtenerReservasPorFecha(fecha).unwrap();
    setReservasManana(reservas);
    setErrorManana(null); // Limpio error si sale bien
  } catch (error) {
    setErrorManana(error);
  } finally {
    setLoadingReservasManana(false);
  }
};

  const realizarReserva = () => {
    navigate('/admin/servicios');
  }

    const redirectModificarReserva = (reserva) => {
    navigate(`/admin/modificar-reserva/${reserva.id}`)
  }






  const columns = [
    { header: 'Cliente', render: (dato) => `${dato.cliente.nombre} ${dato.cliente.apellido}` },
    { header: 'Celular', render: (dato) => dato.cliente.celular },
    { header: 'Hora', render: (dato) => dato.horaInicio },
    { header: 'Fecha', render: (dato) => moment(dato.fecha).format('DD/MM/YYYY') },
    { header: 'Estado de pago', render: (dato) => dato.nombreEstadoDePago }
  ];

  return (
    <div className='container_page'>

      <Title text={"Bienvenida"} />

      <div className="table_reservations_today ">
        <p>Reservas del dia de hoy</p>
        <Table columns={columns} datos={reservasHoy} textBtn1={"Ver más"} textBtn2={"Modificar"} actionBtn1={abrirModalInfoReserva} actionBtn2={redirectModificarReserva} table_width={"table_big"} class_margin={"table_margin_none"} />
        {loadingReservasHoy && <Spinner />}
        {errorHoy && <MessageError error={errorHoy} />}
      </div>

      <ButtonRedirect textBtn={"AGREGAR RESERVA"} btn_variant={"btn_primary "} width_btn={"btn_small"} actionRedirect={realizarReserva}/>


      <div className="table_reservations_tomorrow">
        <p>Reservas del dia de mañana</p>
        <Table columns={columns} datos={reservasManana} textBtn1={"Ver más"} textBtn2={"Modificar"} actionBtn1={abrirModalInfoReserva} actionBtn2={redirectModificarReserva} table_width={"table_big"} class_margin={"table_margin_none"} />
        {loadingReservasManana && <Spinner />}
        {errorManana && <MessageError error={errorManana}/>}
      </div>

      {modalReservaAbierto && <ModalInfoReserva reserva={reservaSeleccionada} alCerrar={cerrarModalInfoReserva} />}




    </div>
  )
}

