import React from 'react'

export const ButtonCard = ({textBtn,actionRedirect,dato,btn_variant ,width_btn = ""}) => {
    return (
        <button className={`btn_base  ${btn_variant} ${width_btn}`} onClick={e => actionRedirect(dato)}>
            {textBtn}
        </button>
    )
}
