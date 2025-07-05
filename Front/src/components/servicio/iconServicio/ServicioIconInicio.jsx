import React from 'react'
import { Link } from 'react-router-dom';
import './servicioIcon.css'

export const ServicioIconInicio = ({text,ruta,src_img}) => {
    return (
        <Link to={ruta} className="container_servicio_icon" style={{ textDecoration: 'none' }}>
            <div className="imagen_mascara">
                <img className='img_servicio_icon' src={src_img} alt={text} />
            </div>
            <h4 className='text_icon'>{text}</h4>
        </Link>
    )
}
