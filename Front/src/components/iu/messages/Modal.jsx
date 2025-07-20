import React from 'react'
import './messages.css'
import '../buttons/buttons.css'
import '../buttons/buttons.css'
import {ButtonModal} from '../buttons/ButtonModal'

export const Modal = ({ mensaje, alCerrar, onConfirmar, textoConfirmar }) => {
  return (
    <div className="fondo_modal">
      <div className="contenido_modal">
        <p>{mensaje}</p>
        <div className="modal_botones">
          {onConfirmar && (
            <ButtonModal 
              btn_variant={"btn_secondary"} 
              width_btn={"btn_small"} 
              alCerrar={onConfirmar} 
              textButton={textoConfirmar} 
            />
          )}
          <ButtonModal 
            btn_variant={"btn_primary"} 
            width_btn={"btn_small"} 
            alCerrar={alCerrar} 
            textButton={"Cerrar"} 
          />
        </div>
      </div>
    </div>
  );
};
