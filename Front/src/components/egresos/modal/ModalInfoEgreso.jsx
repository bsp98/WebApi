import React from 'react'
import moment from 'moment';

export const ModalInfoEgreso = ({ egreso, alCerrar }) => {
    console.log("engreso obtenido",egreso)
    return (
        <div className="fondo_modal_egreso">
            <div className="contenido_modal_egreso">
                <div className='container_info_modal_egreso'>
                    <div className='infoEgreso_modal'>
                        <span className='titel_modal_egreso'>Egreso</span>

                        <div className='group_info_modal_egreso'>
                            <i className='icon_modal_egreso fa-solid fa-calendar-days'></i>
                            <p className='info_modal_egreso'>{`${moment(egreso.fecha).format('DD/MM/YYYY')}`}</p>
                        </div>

                        <div className='group_info_modal_egreso'>
                            <i className='icon_modal_egreso fa-solid fa-coins'></i>
                            <p className='info_modal_egreso'>{`${egreso.categoriaEgreso}`}</p>
                        </div>

                        <div className='group_info_modal_egreso'>
                            <i className='icon_modal_egreso fa-solid fa-star'></i>
                            <p className='info_modal_egreso'>{`${egreso.lugar}`}</p>
                        </div>

                        <div className='group_info_modal_egreso'>
                            <i className='icon_modal_egreso fa-solid fa-credit-card'></i>
                            <p className='info_modal_egreso'>{`$${egreso.monto}`}</p>
                        </div>

                        <div className='group_info_modal_egreso'>
                            <i className='icon_modal_egreso fa-solid fa-star'></i>
                            <p className='info_modal_egreso'>{`${egreso.descripcion}`}</p>
                        </div>
                    </div>

                    <ButtonModal textButton={"Cerrar"} btn_variant={"btn_primary"} width_btn={"btn_small"} alCerrar={alCerrar} />
                </div>
            </div>
        </div>
    );
};
