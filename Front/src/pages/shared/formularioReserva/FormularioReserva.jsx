import '../../page.css';
import './formularioReserva.css'
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//import { useConfiguracionDePago } from '../../hooks/useConfiguracionDePago';
import { useServicios } from '../../../hooks/useServicios'
import { useClientes } from '../../../hooks/useClientes'
import { useReservas } from '../../../hooks/useReservas'
import { FilterBusqueda } from '../../../components/iu/filter/FilterBusqueda';
import { Switch } from '../../../components/iu/inputs/Switch';
import { FormularioAltaReserva } from '../../../components/reserva/formularios/FormularioAltaReserva';
import { InfoServicio } from '../../../components/reserva/infoServicio/InfoServicio';
import { InfoBox } from '../../../components/iu/shared/InfoBox';
import { Modal } from '../../../components/iu/messages/Modal';
import { useAuth } from '../../../hooks/useAuth'

export const FormularioReserva = () => {
  const [clientaRegistrada, setClientaRegistrada] = useState(false);
  const { id } = useParams();
  const formRef = useRef(null);
  // const { formaDePago } = useConfiguracionDePago();
  const { obtenerServicioPorId, servicioSeleccionado } = useServicios();
  const { error, horarioOcupadoError, crearReserva, successMessage, limpiarHorarioOcupadoError, limpiarMensajeExito } = useReservas();
  const { clientes, clienteSeleccionado, filtrarClientes, obtenerClientePorId, limpiarClientes } = useClientes();
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const rol = usuario?.rolUsuario || null;
  const idUsuarioAut = usuario?.idUsuario || null;
  const estado = "noPago";
  const cliente = rol === "admin" ? (clientes[0] || null) : clienteSeleccionado;

  //limpia los datos del cliente Cuando el componente se desmonta
  useEffect(() => {
    return () => {
      limpiarClientes();
    };
  }, []);

  useEffect(() => {
    obtenerServicioPorId(id);
  }, [id]);

  /*EN EL CASO DE QUE LA RESERVA SEA DE ROL CLIENTE TRAR LOS DATOS Y SETEARLO A CLIENTE */
  useEffect(() => {
    if (rol === "cliente" && idUsuarioAut) {
      obtenerClientePorId(idUsuarioAut)
    }
  }, [rol, idUsuarioAut]);

  useEffect(() => {
    if (successMessage) {
      formRef.current.reset();
    }
  }, [successMessage]);

  const activarBusquedaClienta = (e) => {
    const estadoDeActivacion = e.target.checked;
    setClientaRegistrada(estadoDeActivacion);
  }

  const handleAgendarReserva = (datosCliente) => {

    if (estado === "pago" && rol === "cliente" || rol === "publico") {
      if (rol === "cliente") {
        navigate("/cliente/confirmar-reserva");
      }
      else {
        navigate("/confirmar-reserva");
      }
    }
    else {
      crearReserva(datosCliente, id);//se pasan los datos del cliente y el id del servicio
    }
  }

  const obtenerDatosDelCliente = (e) => {
    e.preventDefault();

    const form = e.target;

    const datosCliente = {
      id: form.id.value,
      nombre: form.nombre.value,
      apellido: form.apellido.value,
      email: form.email.value,
      celular: form.celular.value,
    }

    handleAgendarReserva(datosCliente);

  }

  const handleHorarioOcupado = () => {
    limpiarHorarioOcupadoError();
    if (rol === "admin") {
      navigate(`/admin/fecha-hora/crear/${id}`);
    }

    if (rol === "cliente") {
      navigate(`/cliente/fecha-hora/crear/${id}`);
    }

    if (rol === "publico") {
      navigate(`/fecha-hora/crear/${id}`);
    }
  }

  const handleReservaCreadaConExito = () => {

    limpiarMensajeExito();

    if (rol === "admin") {
      navigate(`/admin/inicio`);
    }

    if (rol === "cliente") {
      navigate(`/cliente/inicio`);
    }

    if (rol === "publico") {
      navigate(`/inicio`);
    }
  }

  return (
    <div className="container_page">

      <div className="formulario_reserva__filtros">
        {rol === "admin" && <Switch label={"Cliente registrado"} name={"clienteRegistrado"} switch_style={"container_switch_reserva"} onChange={activarBusquedaClienta} />}
        {rol === "admin" && clientaRegistrada && <FilterBusqueda actionOnSubmit={filtrarClientes} tipoInput1={"text"} tipoInput2={"text"} label1={"Nombre cliente:"} label2={"Celular cliente:"} placeHolder1={"Ingrese el nombre del cliente"} placeHolder2={"Ingrese el celular del cliente"} name1={"nombre"} name2={"celular"} />}
      </div>

      <div className="formulario_reserva__contenido">

        <div className="formulario_reserva__formulario">
          <p>Información de contacto </p>
          <FormularioAltaReserva onSubmit={obtenerDatosDelCliente} formRef={formRef} cliente={cliente} error={error} />
        </div>

        <div className="formulario_reserva__info">

          <div className="formulario_reserva__info_servicio">
            <p>Información del servicio </p>
            <InfoServicio servicio={servicioSeleccionado} />
          </div>

          {estado === "pago" && (
            <div className="formulario_reserva__mensaje_pago">
              <InfoBox>
                <p>Para confirmar tu reserva es necesario abonar el 30%
                  del valor total del servicio mediante Mercado Pago.
                  El monto restante se abonará el día del servicio.
                  Una vez realizado el pago, recibirás la confirmación por correo electrónico.</p>
              </InfoBox>
            </div>
          )}

        </div>

      </div>

      {horarioOcupadoError && <Modal mensaje={horarioOcupadoError} alCerrar={handleHorarioOcupado} />}

      {successMessage && <Modal mensaje={successMessage} alCerrar={handleReservaCreadaConExito} />}

    </div>
  )
}

