import React from 'react'
import './filter.css'
import { InputForm } from '../inputs/InputForm'
import { InputDateFinal } from '../inputs/InputDateFinal'
import { ButtonSubmit } from '../buttons/ButtonSubmit'

export const FilterBusqueda = ({ actionOnSubmit, tipoInput1, tipoInput2, label1, label2, placeHolder1, placeHolder2, name1, name2}) => {
    return (
        <div className='container_filter_busqueda'>

            <form className='form_busqueda' onSubmit={actionOnSubmit}>
                <InputForm tipo={tipoInput1} id={name1} labelDescription={label1} name={name1} placeholder={placeHolder1} style_from_Group={"form_group_busqueda "} style_input={"input_form_busqueda"} />

                {tipoInput2 === "text" ?
                    <InputForm tipo={tipoInput2} id={name2} labelDescription={label2} name={name2} placeholder={placeHolder2} style_from_Group={"form_group_busqueda "} style_input={"input_form_busqueda"} />
                    :
                    <InputDateFinal id={name2} label={label2} name={name2} style_from_Group={"form_group_busqueda "} style_input={"input_form_busqueda"} />
                }

                <div className="form_group">
                    <label></label>
                    <ButtonSubmit value={"Buscar"} btn_variant={"btn_secondary"} width_btn="btn_big" />
                </div>
            </form>

        </div>
    )
}
