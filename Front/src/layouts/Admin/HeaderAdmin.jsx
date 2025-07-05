import logo from '../../assets/logo/Logo.png'
import { NavLink } from 'react-router-dom';
import '../header.css'
import './headerAdmin.css'

export const HeaderAdmin = ({ idUsuario, cerrarSesion,abrirModal}) => {
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
              <NavLink className='item' to="/admin/inicio">INICIO</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="/admin/gestion-servicios">SERVICIOS</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="/admin/gestion-reservas">RESERVAS</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="/admin/gestion-clientes">CLIENTAS</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="/admin/galeria">GALERÍA</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="/admin/gestion-egresos">EGRESOS</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="/admin/estadisticas">ESTADÍSTICAS</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="">LOGO</NavLink>

              <ul className='container_subMenu'>

                <li className='item_subMenu'>
                  <NavLink className='link_submenu' to={`/admin/datos-personales/${idUsuario}`}>Datos personales</NavLink>
                </li>

                <li className='item_subMenu'>
                  <NavLink className='link_submenu' to={`/admin/cambiar-password/${idUsuario}`}>Cambiar contraseña</NavLink>
                </li>

                <li className='item_subMenu'>
                  <button className='link_subMenu' onClick={abrirModal}>Configuración de pago</button>
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
