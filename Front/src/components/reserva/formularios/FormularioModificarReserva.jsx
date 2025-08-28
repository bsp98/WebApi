import './formularioModificarReserva.css'
import '../../styles/formularios.css'
import moment from 'moment';
import { InputForm } from '../../iu/inputs/InputForm';
import { SelectForm } from '../../iu/inputs/SelectForm';
import { ButtonSubmit } from '../../iu/buttons/ButtonSubmit'
import { ButtonRedirect } from '../../iu/buttons/ButtonRedirect'
import { MessageError } from '../../iu/messages/MessageError'


export const FormularioModificarReserva = ({ modificarEstadoDePago, reagendarReserva, cancelarReserva, alCerrar, formRef, error, reserva }) => {
    const tiposDeEstado = [
        { name: "Pendiente", value: 0 },
        { name: "Parcial", value: 1 },
        { name: "Total", value: 2 },
    ];
    return (
        <div className='container_form'>

            <form ref={formRef} onSubmit={modificarEstadoDePago}>

                {reserva.id && <InputForm tipo={"text"} id={"id"} name={"id"} isHidden={true} value={reserva.id} />}

                <InputForm tipo={"text"} id={"clienta"} labelDescription={"Clienta:"} name={"clienta"} isDisabled={true} value={reserva.clienteId ? `${reserva.cliente.nombre} ${reserva.cliente.apellido}` : `${reserva.nombreCliente} ${reserva.apellidoCliente}`} />

                <InputForm tipo={"text"} id={"celular"} labelDescription={"Celular:"} name={"celular"} isDisabled={true} value={reserva.clienteId ? reserva.cliente.celular : reserva.celularCliente} />

                <InputForm tipo={"text"} id={"fecha"} labelDescription={"Fecha:"} name={"fecha"} isDisabled={true} value={moment(reserva.fecha).format('DD/MM/YYYY')} />

                <InputForm tipo={"text"} id={"hora"} labelDescription={"Hora:"} name={"hora"} isDisabled={true} value={reserva.horaInicio.slice(0, 5)} />

                <InputForm tipo={"text"} id={"estadoDePagoActual"} labelDescription={"Estado de pago actual:"} name={"estadoDePagoActual"} isDisabled={true} value={reserva.nombreEstadoDePago} />

                <SelectForm id={"estadoDePago"} labelDescription={"Configuración del estado de pago:"} name={"estadoDePago"} options={tiposDeEstado} defaultValue={"Estados de pago"} />

                {error && (<MessageError error={error} />)}
                
                <div className='form_buttons_group'>
                    <ButtonSubmit value={"Modificar estado de pago"} btn_variant={"btn_primary"} width_btn='btn_medium' />

                    <div className='form_secondary_actions'>
                        <ButtonRedirect btn_variant={"btn_secondary"} width_btn='btn_small' textBtn={"Reagendar"} actionRedirect={reagendarReserva} />
                        <ButtonRedirect btn_variant={"btn_secondary"} width_btn='btn_small' textBtn={"Cancelar reserva"} actionRedirect={cancelarReserva} />
                    </div>

                    <ButtonRedirect btn_variant={"btn_secondary"} width_btn='btn_medium' textBtn={"Cerrar"} actionRedirect={alCerrar} />

                </div>

            </form>

        </div>
    )
}
