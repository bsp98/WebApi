import React from 'react'
import './formularioServicio.css'
import '../../iu/buttons/buttons.css'
import { InputForm } from '../../iu/inputs/InputForm'
import { TextAreaForm } from '../../iu/inputs/TextAreaForm'
import { SelectForm } from '../../iu/inputs/SelectForm'
import {ButtonSubmit} from '../../iu/buttons/ButtonSubmit'
import { MessageError } from '../../iu/messages/MessageError'

export const FormularioAltaServicio = ({ crearServicio, formRef,error }) => {
    const categorias = [
    {name:"UÑAS", value:1},
    {name:"PESTAÑAS", value:2},
    {name:"CEJAS", value:3},
    {name:"PIES", value:4},
    {name:"PROMO", value:5}
    ];

    return (
        <div className='container_form'>

            <form ref={formRef} onSubmit={crearServicio}>

                <InputForm tipo={"text"} id={"nombre"} labelDescription={"Nombre:"} name={"nombre"} placeholder={"Ingrese el nombre del servicio"} esRequerido={true} />

                <SelectForm id={"categoria"} labelDescription={"Categoría:"} name={"categoria"} options={categorias} defaultValue={"Seleccione una categoría"} />

                <InputForm tipo={"number"} id={"precio"} labelDescription={"Precio:"} name={"precio"} placeholder={"Ingrese el precio"} esRequerido={true} />

                <InputForm tipo={"number"} id={"descuento"} labelDescription={"Descuento:"} name={"descuento"} placeholder={"Ingrese el porcentaje de descuento"} />

                <InputForm tipo={"number"} id={"duracion"} labelDescription={"Duración:"} name={"duracion"} placeholder={"Ingrese la duración"} esRequerido={true} />

                <TextAreaForm id={"descripcion"} labelDescription={"Descripción:"} name={"descripcion"} placeholder={"Describa el servicio"} esRequerido={true} />

                {error && (<MessageError error={error}/>) }
                
                <ButtonSubmit  value={"AGREGAR SERVICIO"} btn_variant={"btn_primary"} width_btn='btn_big'/>

            </form>

        </div>
    )
}
