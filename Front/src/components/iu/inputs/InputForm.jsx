import React from 'react'
import './inputs.css'

export const InputForm = ({tipo,id,labelDescription,name,placeholder,esRequerido,value,isDisabled,isHidden,style_from_Group ='',style_input =''}) => {
    return (
        <div className={`form_group ${style_from_Group}`}>
            {!isHidden && <label htmlFor={id}>{labelDescription}</label>}
            <input className={`input_form ${style_input}`} type={tipo} id={id} name={name} placeholder={placeholder} required={esRequerido} defaultValue={value??""} disabled={isDisabled} hidden={isHidden} />
        </div>
    )
}
