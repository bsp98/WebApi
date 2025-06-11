import React from 'react'
import './inputs.css'

export const InputForm = ({tipo,id,labelDescription,name,placeholder,esRequerido,value,isDisabled,isHidden}) => {
    return (
        <div className="form_group">
            {!isHidden && <label htmlFor={id}>{labelDescription}</label>}
            <input className='input_form' type={tipo} id={id} name={name} placeholder={placeholder} required={esRequerido} defaultValue={value??""} disabled={isDisabled} hidden={isHidden} />
        </div>
    )
}
