import React from 'react'

export const ButtonAction = ({text,variant,dato,action}) => {
    return (
        <button className={`btn_action ${variant}`} onClick={ e => action(dato)}>
            {text}
        </button>
    )
}
