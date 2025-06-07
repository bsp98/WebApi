import React from 'react'

export const ButtonAction = ({text,variant}) => {
    return (
        <button className={`btn_action ${variant}`}>
            {text}
        </button>
    )
}
