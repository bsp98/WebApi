import React from 'react'
import './messages.css'

export const MessageError = ({error}) => {
    return (
        <div className="mensaje_error">
            <span>{error}</span>
        </div>
    )
}
