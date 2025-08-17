import logo from '../../assets/logo/Logo.png'
import { NavLink } from 'react-router-dom';
import '../header.css'


export const HeaderCliente = ({ idUsuario, cerrarSesion }) => {
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
              
              <NavLink className='item' to="/cliente/inicio">
                <i className="logo_user_nav fa-regular fa-circle-user"></i>
              </NavLink>

              <ul className='container_subMenu'>

                <li className='item_subMenu'>
                  <NavLink className='link_submenu' to={`/cliente/datos-personales/${idUsuario}`}>Datos personales</NavLink>
                </li>

                <li className='item_subMenu'>
                  <NavLink className='link_submenu' to={`/cliente/cambiar-password/${idUsuario}`}>Cambiar contraseña</NavLink>
                </li>

                <li className='item_subMenu'>
                  <button className='link_subMenu' onClick={cerrarSesion}>Cerrar sesión</button>
                </li>

              </ul>

            </li>

          </ul>

        </nav>

      </div>
    </header>
  )
}
