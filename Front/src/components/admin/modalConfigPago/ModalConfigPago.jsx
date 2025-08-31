import React from 'react'
import './modalConfigPago.css'
import { SelectForm } from '../../iu/inputs/SelectForm';
import { ButtonSubmit } from '../../iu/buttons/ButtonSubmit';
import { ButtonModal } from '../../iu/buttons/ButtonModal';


export const ModalConfigPago = ({ cerrarModal, modificarFormaDePago, formaDePago }) => {

    const opcionesConfig = [
        { name: "Pago al finalizar", value: 0 },
        { name: "Pago anticipado", value: 1 },
    ];

    return (
        <div className="fondo_modal_pago">
            <div className="contenido_modal_pago">

                <div className='container_info_modal'>
                    <p className='titel_modal'>Configuración de pago</p>

                    <p>Estado actual: {formaDePago === 1 ? "Pago anticipado" : "Pago al finalizar"}</p>
                </div>

                <form onSubmit={modificarFormaDePago}>

                    <div className='input_forma_pago'>
                        <SelectForm id={"formaDePago"} labelDescription={"Forma de pago:"} name={"formaDePago"} options={opcionesConfig} defaultValue={"Seleccione la forma de pago"} />
                    </div>

                    <div className='container_buttons_form'>
                        <ButtonSubmit value={"Modificar"} btn_variant={"btn_primary"} width_btn='btn_small' />
                        <ButtonModal textButton={"Cerrar"} btn_variant={"btn_secondary"} width_btn={"btn_small"} alCerrar={cerrarModal} />
                    </div>

                </form>
            </div>
        </div>
    )
}
