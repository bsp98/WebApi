import React from 'react'
import './giftCard.css'
import { FormularioGiftCard } from '../../../components/giftCard/formularios/FormularioGiftCard'
import { useGiftCard } from '../../../hooks/useGiftCard'
import { useClientes } from '../../../hooks/useClientes'
import { useAuth } from '../../../hooks/useAuth';
import { useRef, useEffect } from 'react';
import { Modal } from '../../../components/iu/messages/Modal';
import giftCardImg from '../../../assets/gifCard/giftCard.png'

export const GiftCard = () => {
  const { error, successMessage, solicitarGiftCard, montoGift, guardarMontoPrestablecido, guardarMontoPersonalizado, limpiarMontoGift, seleccionarOtroMonto = false, habilitarSeleccionOtroMonto, limpiarMensajeExito } = useGiftCard();
  const { clienteSeleccionado, obtenerClientePorId } = useClientes();
  const formRef = useRef(null);
  const { usuario } = useAuth();
  const idClienteAut = usuario?.idUsuario || null;

  useEffect(() => {
    if (idClienteAut) {
      obtenerClientePorId(idClienteAut);
    }

  }, [idClienteAut])

  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
      limpiarMontoGift();
    }
  }, []);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
      limpiarMontoGift();
    }
  }, [successMessage]);


  // Reset al cerrar sesion
  useEffect(() => {
    if (!clienteSeleccionado) {
      if (formRef.current) formRef.current.reset();
      limpiarMontoGift();
    }
  }, [clienteSeleccionado]);



  return (
    <div className='container_page'>
      <div className='container_giftCard'>
        <div className='container_img_gift'>
          <img className='img_giftCard' src={giftCardImg} alt="imagen de la gift card"></img>
        </div>

        <div className='container_info_gift'>
          <div className='container_texto_gift'>
            <p className='title_texto_gift'>
              GIFT CARD VIRTUAL
            </p>

            <p className='monto_texto_gift'>
              ${montoGift}
            </p>

            <p className='info_texto_gift'>
              Ideal para cumpleaños, aniversarios o para sorprender a alguien especial. Completá el formulario y recibí la Gift Card por correo electrónico. Una vez enviada la solicitud, nos contactaremos con vos para coordinar el pago.
              la reciba podrá usarla para reservar el servicio que prefiera. Válida por 6 meses desde su emisión.
            </p>

          </div>

          <div className='container_buttons_gift'>
            <button type="button" className="button_monto" onClick={(e) => guardarMontoPrestablecido(Number(e.target.value))} value="1000">$1000</button>
            <button type="button" className="button_monto" onClick={(e) => guardarMontoPrestablecido(Number(e.target.value))} value="1500">$1500</button>
            <button type="button" className="button_monto" onClick={(e) => guardarMontoPrestablecido(Number(e.target.value))} value="2000">$2000</button>
            <button type="button" className="button_monto" onClick={(e) => guardarMontoPrestablecido(Number(e.target.value))} value="2500">$2500</button>
            <button type="button" className="button_monto" onClick={habilitarSeleccionOtroMonto}>Otro monto</button>
            {seleccionarOtroMonto &&
              <div className={`form_group`}>
                <label htmlFor={"otroMonto"}>Monto Personalizado</label>
                <input className="input_form" type="number" id="otroMonto" name="otroMonto" placeholder="Ingrese el monto deseado" defaultValue={0} onChange={(e) => guardarMontoPersonalizado(Number(e.target.value))} />
              </div>
            }
          </div>

        </div>

      </div>

      <div className='container_formulario_giftCard'>

        <FormularioGiftCard onSubmit={solicitarGiftCard} formRef={formRef} cliente={clienteSeleccionado} error={error} />
        {/*EL MONTO MINIMO QUE SE PUEDE SELECCIONAR ES 790*/}
      </div>

      <div className='container_preguntasFrecuentes_giftCard'>
        <p className='title_preguntas_gift'>
          Preguntas Frecuentes sobre la Gift Card
        </p>

        {/* <div className='container_text_preguntas'>
          <p className='subtitle_preguntas_gift'>
            ¿Cómo funciona la Gift Card?
          </p>
          <p className='text_preguntas_gift'>
            Una vez completado el formulario, enviaremos la Gift Card al correo electrónico del destinatario
            con toda la información necesaria para utilizarla.
          </p>
        </div>*/}

        <div className='container_text_preguntas'>
          <p className='subtitle_preguntas_gift'>
            ¿Cuánto tiempo tiene de validez?
          </p>
          <p className='text_preguntas_gift'>
            La Gift Card tiene una validez de 6 meses a partir de la fecha de envío.
          </p>
        </div>

        <div className='container_text_preguntas'>
          <p className='subtitle_preguntas_gift'>
            ¿Puedo elegir el monto de la Gift Card?
          </p>
          <p className='text_preguntas_gift'>
            Sí, podés seleccionar entre montos predeterminados o ingresar un valor personalizado.
          </p>
        </div>

        <div className='container_text_preguntas'>
          <p className='subtitle_preguntas_gift'>
            ¿Cuándo se envía la Gift Card?
          </p>
          <p className='text_preguntas_gift'>
            La Gift Card se envía por correo electrónico una vez confirmada la reserva y coordinado el pago.
          </p>
        </div>

        <div className='container_text_preguntas'>
          <p className='subtitle_preguntas_gift'>
            ¿Puedo personalizar un mensaje?
          </p>
          <p className='text_preguntas_gift'>
            Sí, tenés la opción de incluir un mensaje especial que se mostrará en la Gift Card.
          </p>
        </div>

        <div className='container_text_preguntas'>
          <p className='subtitle_preguntas_gift'>
            ¿Qué métodos de pago aceptan?
          </p>
          <p className='text_preguntas_gift'>
            Una vez reservada la Gift Card, nos pondremos en contacto con vos para coordinar el método de pago que prefieras.
          </p>
        </div>

      </div>

      {successMessage && (
        <Modal mensaje={successMessage} alCerrar={limpiarMensajeExito} />
      )}
    </div>
  )
}
