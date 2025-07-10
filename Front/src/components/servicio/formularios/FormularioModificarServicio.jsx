import React from 'react'
import './formularioServicio.css'
import '../../iu/buttons/buttons.css'
import { useNavigate } from 'react-router-dom'
import { InputForm } from '../../iu/inputs/InputForm'
import { TextAreaForm } from '../../iu/inputs/TextAreaForm'
import { ButtonSubmit } from '../../iu/buttons/ButtonSubmit'
import { MessageError } from '../../iu/messages/MessageError'
import { Switch } from '../../iu/inputs/Switch'
import { ButtonRedirect } from '../../iu/buttons/ButtonRedirect'

export const FormularioModificarServicio = ({ modificarServicio, formRef, error, servicio }) => {
    const navigate = useNavigate();


    const volverAtras = () => {
        navigate('/admin/gestion-servicios')
    }

    return (
        <div className='container_form'>

            <form ref={formRef} onSubmit={modificarServicio}>

                <InputForm tipo={"text"} id={"id"} name={"id"} isHidden={true} value={servicio.id} />

                <InputForm tipo={"text"} id={"nombre"} labelDescription={"Nombre:"} name={"nombre"} placeholder={"Ingrese el nombre del servicio"} esRequerido={true} value={servicio.nombre} />

                <InputForm tipo={"text"} id={"categoria"} labelDescription={"Categoría:"} name={"categoriaName"} placeholder={""} isDisabled={true} value={servicio.categoriaNombre} />

                <InputForm tipo={"text"} id={"categoriaValue"} name={"categoriaValue"} isHidden={true} value={servicio.categoria} />

                <InputForm tipo={"number"} id={"precio"} labelDescription={"Precio:"} name={"precio"} placeholder={"Ingrese el precio"} esRequerido={true} value={servicio.precio} />

                <InputForm tipo={"number"} id={"descuento"} labelDescription={"Descuento:"} name={"descuento"} placeholder={"Ingrese el porcentaje de descuento"} value={servicio.descuento} />

                <InputForm tipo={"number"} id={"duracion"} labelDescription={"Duración:"} name={"duracion"} placeholder={"Ingrese la duración"} esRequerido={true} value={servicio.tiempoDeDuracionMin} />

                <TextAreaForm id={"descripcion"} labelDescription={"Descripción:"} name={"descripcion"} placeholder={"Describa el servicio"} esRequerido={true} value={servicio.descripcion} />

                <div className='container_switch_servicio'>
                    <Switch label={"Estado"} name={"disponibilidad"} switch_style={"container_switch_servicio"} activo={servicio.disponibilidad} />
                </div>

                {error && (<MessageError error={error} />)}

                <div className='container_buttons_form'>
                    <ButtonSubmit value={"Modificar"} btn_variant={"btn_primary"} width_btn='btn_small' />
                    <ButtonRedirect btn_variant={"btn_secondary"} width_btn='btn_small' textBtn={"Cancelar"} actionRedirect={volverAtras} />
                </div>

            </form>

        </div>
    )
}
