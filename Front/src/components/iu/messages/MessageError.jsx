import React from 'react'
import './messages.css'
//<span>{error?.message || error}</span>
export const MessageError = ({error}) => {
    return (
        <div className="mensaje_error">
            <span>{error}</span>
        </div>
    )
}
