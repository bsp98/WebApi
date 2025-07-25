import React from 'react'
import './formularioAltaEgreso.css'
import { SelectForm } from '../iu/inputs/SelectForm';
import { InputForm } from '../iu/inputs/InputForm';
import { TextAreaForm } from '../iu/inputs/TextAreaForm';
import { MessageError } from '../iu/messages/MessageError';
import { ButtonSubmit } from '../iu/buttons/ButtonSubmit';
import { InputDateFinal } from '../iu/inputs/InputDateFinal';


export const FormularioAltaEgreso = ({ crearEgreso, formRef, error }) => {
    const categorias = [
        { name: "ESMALTES", value: 1 },
        { name: "INSUMOS", value: 2 },
        { name: "HERRAMIENTAS", value: 3 },
        { name: "DECORACION", value: 4 },
        { name: "GASTOS COMUNES", value: 5 }
    ];
    return (
        <div className='container_form'>

            <form ref={formRef} onSubmit={crearEgreso}>

                <InputDateFinal id={"fechaDeCompra"} label={"Fecha de compra"} name={"fechaDeCompra"} />

                <SelectForm id={"categoria"} labelDescription={"Categoría:"} name={"categoria"} options={categorias} defaultValue={"Seleccione una categoría"} />

                <InputForm tipo={"text"} id={"lugar"} labelDescription={"Lugar:"} name={"lugar"} placeholder={"Ingrese el lugar"} esRequerido={true} />

                <InputForm tipo={"number"} id={"costo"} labelDescription={"Costo:"} name={"costo"} placeholder={"Ingrese el costo abonado"} />

                <TextAreaForm id={"descripcion"} labelDescription={"Descripción:"} name={"descripcion"} placeholder={"Describa detalles de la compra"} esRequerido={true} />

                {error && (<MessageError error={error} />)}

                <ButtonSubmit value={"AGREGAR EGRESO"} btn_variant={"btn_primary"} width_btn='btn_medium' />

            </form>

        </div>
    )
}
