import React from 'react'
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import './inputs.css'
import "flatpickr/dist/l10n/es.js"; // Para idioma español

export const InputDateFinal = ({ id, label, name,style_from_Group ='',style_input ='' }) => {
    return (
        <div className={`form_group ${style_from_Group}`}>
            <label htmlFor={id}>{label}</label>
            <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                <Flatpickr
                    id={id}
                    name={name}
                    required
                    options={{
                        dateFormat: "d/m/Y",
                        locale: "es"
                    }}
                    className={`input_form ${style_input}`}
                    style={{ paddingRight: '2rem' }}
                />
                <i
                    className="fa-regular fa-calendar"
                    style={{
                        position: 'absolute',
                        right: '18px',
                        top: '40%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                        color: 'var(--color-primary)',
                        fontSize: '1.6rem'
                    }}
                />
            </div>
        </div>
    );
}
