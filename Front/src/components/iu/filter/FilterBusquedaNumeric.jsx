import React from 'react'
import './filter.css'
import { InputForm } from '../inputs/InputForm'
import { ButtonSubmit } from '../buttons/ButtonSubmit'

export const FilterBusquedaNumeric = ({ actionOnSubmit, label1,name1,placeholder1}) => {
    return (
        <div className='container_filter_busqueda'>

            <form className='form_busqueda_numeric' onSubmit={actionOnSubmit}>
                <InputForm tipo={"number"} id={name1} labelDescription={label1} name={name1} placeholder={placeholder1} esRequerido={true} />

                <div className="form_group">
                    <label></label>
                    <ButtonSubmit value={"Buscar"} btn_variant={"btn_secondary"} width_btn="btn_big" />
                </div>
            </form>

        </div>
    );
}