import '../../page.css';
import './formularioReserva.css'
import { useState, useEffect,useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//import { useConfiguracionDePago } from '../../hooks/useConfiguracionDePago';
import { useServicios } from '../../../hooks/useServicios'
import {useClientes} from '../../../hooks/useClientes'
import {useReservas} from '../../../hooks/useReservas'
import { FilterBusqueda } from '../../../components/iu/filter/FilterBusqueda';
import { Switch } from '../../../components/iu/inputs/Switch';
import { FormularioAltaReserva } from '../../../components/reserva/formularios/FormularioAltaReserva';
import { InfoServicio } from '../../../components/reserva/infoServicio/InfoServicio';
import { InfoBox } from '../../../components/iu/shared/InfoBox';

export const FormularioReserva = () => {
  const [clientaRegistrada, setClientaRegistrada] = useState(false);
  const { id } = useParams();
  const formRef = useRef(null);
 // const { formaDePago } = useConfiguracionDePago();
  const { obtenerServicioPorId, servicioSeleccionado } = useServicios();
  const {error} = useReservas();
  const {clientes,filtrarClientes} = useClientes();
  const rol = "admin";
const estado = "pago";
  useEffect(() => {
    obtenerServicioPorId(id);
  }, [id]);

  const activarBusquedaClienta = (e) => {
    const estadoDeActivacion = e.target.checked;
    setClientaRegistrada(estadoDeActivacion);
  }

  const obtenerDatosDelCliente = () =>{

  }

  return (
    <div className="container_page">

      <div className="formulario_reserva__filtros">
        {rol === "admin" && <Switch label={"Cliente registrado"} name={"clienteRegistrado"} onChange={activarBusquedaClienta} />}
        {rol === "admin" && clientaRegistrada && <FilterBusqueda actionOnSubmit={filtrarClientes} tipoInput1={"text"} tipoInput2={"text"} label1={"Nombre cliente:"} label2={"Apellido cliente:"} placeHolder1={"Ingrese el nombre del cliente"} placeHolder2={"Ingrese el apellido del cliente"} name1={"nombre"} name2={"apellido"} />}
      </div>

      <div className="formulario_reserva__contenido">

        <div className="formulario_reserva__formulario">
          <p>Información de contacto </p>
          <FormularioAltaReserva crearReserva={obtenerDatosDelCliente} formRef={formRef} clientes={clientes} error={error}/>
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

    </div>
  )
}

