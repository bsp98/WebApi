import React from 'react'
import './inputs.css'

export const SelectForm = ({id,labelDescription,name,options,defaultValue}) => {
    return (
        <div className="form_group">
            <label htmlFor={id}>{labelDescription}</label>
            <select className="input_form" id={id} name={name} defaultValue="">
                <option value="" disabled>{defaultValue}</option>
                {options.map(opt =>(
                    <option value={opt.value} key={opt.value}>{opt.name}</option>
                ))}
            </select>
        </div>
    )
}
