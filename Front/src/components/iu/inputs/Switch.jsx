import React from 'react'
import './inputs.css'
export const Switch = ({label,name,activo }) => {
    return (
        <div className='container_switch'>
            <span>{label}</span>
            <label className="switch">
                <input type="checkbox" name={name} defaultChecked={activo} />
                <span className="slider"></span>
            </label>
        </div>
    )
}
