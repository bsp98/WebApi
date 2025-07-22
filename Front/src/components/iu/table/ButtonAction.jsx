import React from 'react'

export const ButtonAction = ({text,variant,dato,action,disabled = false}) => {
    return (
        <button className={`btn_action ${variant}`} onClick={ e => action(dato)} disabled={disabled}>
            {text}
        </button>
    )
}
