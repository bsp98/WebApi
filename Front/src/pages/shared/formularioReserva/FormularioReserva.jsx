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
import { useConfiguracionDePago } from '../../../hooks/useConfiguracionDePago'

export const FormularioReserva = () => {
  const [clientaRegistrada, setClientaRegistrada] = useState(false);
  const { id } = useParams();
  const formRef = useRef(null);
  const { formaDePago } = useConfiguracionDePago();
  const { obtenerServicioPorId, servicioSeleccionado } = useServicios();
  const { error, horarioOcupadoError, crearReserva, successMessage, limpiarHorarioOcupadoError, limpiarMensajeExito } = useReservas();
  const { clientes, clienteSeleccionado, filtrarClientes, obtenerClientePorId, limpiarClientes } = useClientes();
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const rol = usuario?.rolUsuario || "Publico";
  const idUsuarioAut = usuario?.idUsuario || null;
  const estado = formaDePago;
  const cliente = rol === "Administrador" ? (clientes[0] || null) : clienteSeleccionado;

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
    if (rol === "Cliente" && idUsuarioAut) {
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
    console.log("entro a handleAgendarReserva", estado)

    if (estado === 1 && rol === "Cliente" || rol === "Publico") {

      if (rol === "Cliente") {

        navigate(`/cliente/confirmar-reserva/${id}`);
      }
      else {

        navigate(`/confirmar-reserva/${id}`);
      }
    }
    else {
      console.log("entro al else no redirect, crea la reserva: ",rol)
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
    if (rol === "Administrador") {
      navigate(`/admin/fecha-hora/crear/${id}`);
    }

    if (rol === "Cliente") {
      navigate(`/cliente/fecha-hora/crear/${id}`);
    }

    if (rol === "Publico") {
      navigate(`/fecha-hora/crear/${id}`);
    }
  }

  const handleReservaCreadaConExito = () => {

    limpiarMensajeExito();

    if (rol === "Administrador") {
      navigate(`/admin/inicio`);
    }

    if (rol === "Cliente") {
      navigate(`/cliente/inicio`);
    }

    if (rol === "Publico") {
      navigate(`/inicio`);
    }
  }

  return (
    <div className="container_page">

      <div className="formulario_reserva__filtros">
        {rol === "Administrador" && <Switch label={"Cliente registrado"} name={"clienteRegistrado"} switch_style={"container_switch_reserva"} onChange={activarBusquedaClienta} />}
        {rol === "Administrador" && clientaRegistrada && <FilterBusqueda actionOnSubmit={filtrarClientes} tipoInput1={"text"} tipoInput2={"text"} label1={"Nombre cliente:"} label2={"Celular cliente:"} placeHolder1={"Ingrese el nombre del cliente"} placeHolder2={"Ingrese el celular del cliente"} name1={"nombre"} name2={"celular"} />}
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

          {estado === 1 && (
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

