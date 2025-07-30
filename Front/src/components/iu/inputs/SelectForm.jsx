import React from 'react'
import './inputs.css'

export const SelectForm = ({id,labelDescription,name,options,defaultValue,style_from_Group ='',style_input =''}) => {
    return (
        <div className={`form_group ${style_from_Group}`}>
            <label htmlFor={id}>{labelDescription}</label>
            <select className={`input_form ${style_input}`} id={id} name={name} defaultValue="">
                <option value="" disabled>{defaultValue}</option>
                {options.map(opt =>(
                    <option value={opt.value} key={opt.value}>{opt.name}</option>
                ))}
            </select>
        </div>
    )
}
