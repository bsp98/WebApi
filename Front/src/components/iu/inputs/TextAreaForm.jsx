import React from 'react'
import './inputs.css'

export const TextAreaForm = ({id,labelDescription, name, placeholder }) => {
    return (
        <div className="form_group">
            <label htmlFor={id}>{labelDescription}</label>
            <textarea className='text_area' id={id} name={name} placeholder={placeholder}></textarea>
        </div>
    )
}
