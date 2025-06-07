import logo from '../../assets/logo/Logo.png'
import { NavLink } from 'react-router-dom';
import '../header.css'


export const HeaderCliente = () => {
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
              <NavLink className='item' to="/cliente/inicio">INICIO</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="/cliente/servicios">SERVICIOS</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="/cliente/galeria">GALERÍA</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="/cliente/gift-card">GIFT CARD</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="/cliente/contacto">CONTACTO</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="">LOGO USUARIO</NavLink>
            </li>

          </ul>

        </nav>

      </div>
    </header>
  )
}
