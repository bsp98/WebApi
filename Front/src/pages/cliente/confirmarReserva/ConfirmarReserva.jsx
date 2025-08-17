import {useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './confirmarReserva.css'
import { Title } from '../../../components/iu/texts/Title'
import { InfoBox } from '../../../components/iu/shared/InfoBox'
import { useServicios } from '../../../hooks/useServicios'
import {MessageError} from '../../../components/iu/messages/MessageError'
import { ButtonSubmit } from '../../../components/iu/buttons/ButtonSubmit'
import {InfoServicio} from '../../../components/reserva/infoServicio/InfoServicio'
import { usePago } from '../../../hooks/usePago';


export const ConfirmarReserva = () => {
  const { idServicio } = useParams();
  const { obtenerServicioPorId, servicioSeleccionado } = useServicios();
    const {urlMercadoPago,error,solicitarPago} = usePago();

  useEffect(() => {
    obtenerServicioPorId(idServicio);
  }, [idServicio]);

  // Cuando la URL de Mercado Pago se actualiza se redirige a la pantalla de mercado pago
  useEffect(() => {
    if (urlMercadoPago) {
      redirigirAPago(urlMercadoPago);
    }
  }, [urlMercadoPago]);

  const redirigirAPago = (url) => {
  window.location.href = url; // Redirección externa
};

  return (
    <div className='container_page'>
      <Title text={"Confirmación de reserva"} />

      <div className="container_mensaje_confirmacion">
        <InfoBox>
          <p className='mensaje_confirmacion'>
            Revisá los detalles de tu reserva.
            Antes de continuar, seleccioná si querés abonar solo el 30% del valor total del servicio o el 100%.
            Al confirmar tu elección, serás redirigido a la plataforma segura de Mercado Pago para realizar el pago correspondiente.
            Una vez procesado, recibirás la confirmación por correo electrónico.
          </p>
        </InfoBox>
      </div>

      <div className='container_info_servicio_confirmacion'>
        <p>Información del servicio</p>
        <InfoServicio servicio={servicioSeleccionado} />
      </div>

      <div className='container_form_confirmacion_monto'>

        <form onSubmit={solicitarPago}>

          <div className='container_opciones_pago'>
            <div className='group_opcion_pago'>
                <input type="radio" name="porcentaje" value="30" defaultChecked />
                <p className='text_opcion_pago'>Pagar 30% del total</p>
            </div>

            <div className='group_opcion_pago'>
                <input type="radio" name="porcentaje" value="100" />
                <p className='text_opcion_pago'>Pagar 100% del total</p>
            </div>
          </div>

          {error && (<MessageError error={error} />)}

          <ButtonSubmit value={"CONFIRMAR Y PAGAR"} btn_variant={"btn_primary"} width_btn='btn_big' />

        </form>

      </div>

    </div>
  )
}
