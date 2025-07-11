import React from 'react'
import './calendarioReserva.css'
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/l10n/es.js"; // Para idioma español

export const CalendarioReserva = ({onFechaSeleccionada}) => {
    return (
            <div className="calendario_fijo">
                <Flatpickr
                    options={{
                        dateFormat: "d/m/Y",
                        locale: "es",
                        inline: true
                    }}
                    onChange={(fechaSeleccionada) => {
                        onFechaSeleccionada(fechaSeleccionada[0]);//se accede con el indice porque inyecta un array de fechas
                    }}
                />
            </div>

    );
}
