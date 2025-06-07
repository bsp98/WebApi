import logo from '../../assets/logo/Logo.png'
import { NavLink } from 'react-router-dom';
import '../header.css'

export const HeaderPublico = () => {
  return (
    <header className='header'>

      <div className='header-content'>

      <div className="logo-placeholder"></div> {/* ocupa espacio, del logo */}

      <div className='container_logo'>
        <img className='logo' src={logo} alt="Logo de la empresa"></img>
      </div>

      <nav className='nav_container'>

        <ul className='list_container'>

          <li className='item_container'>
            <NavLink className='item' to="/inicio">INICIO</NavLink>
          </li>

          <li className='item_container'>
            <NavLink className='item' to="/servicios">SERVICIOS</NavLink>
          </li>

          <li className='item_container'>
            <NavLink className='item' to="/galeria">GALERÍA</NavLink>
          </li>

          <li className='item_container'>
            <NavLink className='item' to="/gift-card">GIFT CARD</NavLink>
          </li>

          <li className='item_container'>
            <NavLink className='item' to="/contacto">CONTACTO</NavLink>
          </li>

          <li className='item_container'>
            <NavLink className='item' to="/login">INICIAR SESION</NavLink>
          </li>

        </ul>

      </nav>

    </div>

    </header >
  )
}
