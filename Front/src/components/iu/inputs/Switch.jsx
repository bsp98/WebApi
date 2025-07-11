import React from 'react'
import './inputs.css'
export const Switch = ({label,name,switch_style,activo = false, onChange = undefined }) => {
    return (
        <div className={`${switch_style}`}>
            <span className='label_switch'>{label}</span>
            <label className="switch">
                <input type="checkbox" name={name} defaultChecked={activo} onChange={onChange} />
                <span className="slider"></span>
            </label>
        </div>
    )
}
