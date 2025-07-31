import React from 'react'
import './filter.css'
import { SelectForm } from '../inputs/SelectForm'
import { InputDateFinal } from '../inputs/InputDateFinal'
import { ButtonSubmit } from '../buttons/ButtonSubmit'

export const FilterBusquedaSelect = ({ actionOnSubmit, label1, label2, name1, name2, options, defaultValueSelect }) => {
    return (
        <div className='container_filter_busqueda'>

            <form className='form_busqueda' onSubmit={actionOnSubmit}>
                <SelectForm id={name1} labelDescription={label1} name={name1} options={options} defaultValue={defaultValueSelect} style_from_Group='form_group_busqueda' style_input={"input_form_busqueda"} />

                <InputDateFinal id={name2} label={label2} name={name2} style_from_Group={"form_group_busqueda "} style_input={"input_form_busqueda"} />

                <div className="form_group">
                    <label></label>
                    <ButtonSubmit value={"Buscar"} btn_variant={"btn_secondary"} width_btn="btn_big" />
                </div>
            </form>

        </div>
    );
}
