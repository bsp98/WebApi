import React from 'react'
import './formularioAltaPublicacion.css'
import '../../iu/buttons/buttons.css'
import { InputForm } from '../../iu/inputs/InputForm'
import { SelectForm } from '../../iu/inputs/SelectForm'
import { ButtonSubmit } from '../../iu/buttons/ButtonSubmit'
import { MessageError } from '../../iu/messages/MessageError'
import { InputFile } from '../../iu/inputs/InputFile'
import{TextAreaForm} from '../../iu/inputs/TextAreaForm'

export const FormularioAltaPublicacion = ({ onSubmit, formRef, error }) => {
    const categorias = [
        { name: "UÑAS", value: 1 },
        { name: "PESTAÑAS", value: 2 },
        { name: "CEJAS", value: 3 },
        { name: "PIES", value: 4 },
        { name: "PROMO", value: 5 }
    ];
    return (
        <div className='container_form'>

            <form ref={formRef} onSubmit={onSubmit}>

                <InputForm tipo={"text"} id={"titulo"} labelDescription={"Titulo:"} name={"titulo"} placeholder={"Ingrese el titulo de la  publicación"} esRequerido={true} />

                <SelectForm id={"categoria"} labelDescription={"Categoría:"} name={"categoria"} options={categorias} defaultValue={"Seleccione una categoría"} />

                <InputFile name={"imagen"} label={"Seleccione una imagen"}/>

                <TextAreaForm id={"descripcion"} labelDescription={"Descripción:"} name={"descripcion"} placeholder={"Descripción"} esRequerido={true} />

                {error && (<MessageError error={error} />)}

                <ButtonSubmit value={"AGREGAR PUBLICACIÓN"} btn_variant={"btn_primary"} width_btn='btn_medium' />

            </form>

        </div>
    )
}
