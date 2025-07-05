import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom'

export const Footer = ({ tipoUsuario }) => {
  return (
    <footer className="footer">

      {tipoUsuario != "admin" && (
        <div className='footer-content '>

          <div className='info_container'>

            <div className='gruop_info'>
              <i className='icon_info fa-solid fa-location-dot'></i>
              <p className='text_footer'>18 de Julio 1978</p>
            </div>

            <div className='gruop_info'>
              <i className='icon_info fa-solid fa-phone'></i>
              <p className='text_footer'>+598 97 752 448</p>
            </div>

            <div className='gruop_info'>
              <i className='icon_info fa-solid fa-envelope'></i>
              <p className='text_footer'>ctvwapawapisima@gmail.com</p>
            </div>

            <div className='gruop_policy'>
              <Link className='text_footer text_policy' to={tipoUsuario === 'cliente' ? '/cliente/politica-de-privacidad' : '/politica-de-privacidad'}>Política de privacidad</Link>
              <Link className='text_footer text_policy' to={tipoUsuario === 'cliente' ? '/cliente/aviso-legal' : '/aviso-legal'}>Aviso legal</Link>
            </div>

          </div>

          <div className='social_container'>
            <i className="social_icon fa-brands fa-whatsapp"></i>
            <i className="social_icon fa-brands fa-instagram"></i>
          </div>

          <div className='map_container'>
            <iframe className='map'
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.219356915509!2d-56.17319080000001!3d-34.9009443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f81b326a9b2a5%3A0x80c9ccbe9cd5474a!2sAv.%2018%20de%20Julio%201978%2C%2011200%20Montevideo%2C%20Departamento%20de%20Montevideo!5e0!3m2!1ses!2suy!4v1749952834556!5m2!1ses!2suy"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      )}



    </footer>
  )
}
