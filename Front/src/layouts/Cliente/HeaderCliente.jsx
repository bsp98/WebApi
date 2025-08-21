import logo from '../../assets/logo/Logo.png'
import { NavLink } from 'react-router-dom';
import '../header.css'
import { useState, useEffect } from "react";


export const HeaderCliente = ({ idUsuario, cerrarSesion }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);// cierra el menú si la pantalla es mayor a tablet
        setSubMenuOpen(false); // cierra el sub menú si la pantalla es mayor a tablet
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);


  // Cierra menú y submenú al hacer click en un enlace
  const handleLinkClick = () => {
    setMenuOpen(false);
    setSubMenuOpen(false);
  };

    // Cierra menú,submenú y sesion
  const cerrarSesionUsuario = () => {
    setMenuOpen(false);
    setSubMenuOpen(false);
    cerrarSesion();
  };

  return (
    <header className='header'>

      <div className='header-content'>

        <div className="logo-placeholder"></div> {/* ocupa espacio, del logo */}

        <div className='container_logo'>
          <img className='logo' src={logo} alt="Logo de la empresa"></img>
        </div>

        <button className="menu-toggle" onClick={handleMenu}>
          <i class="fa-solid fa-bars"></i>
        </button>

        <nav className={`nav_container ${menuOpen ? "active" : ""}`}>

          <ul className='list_container'>

            <li className='item_container'>
              <NavLink className='item' to="/cliente/inicio" onClick={handleLinkClick }>INICIO</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="/cliente/servicios" onClick={handleLinkClick }>SERVICIOS</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="/cliente/galeria" onClick={handleLinkClick }>GALERÍA</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="/cliente/gift-card" onClick={handleLinkClick }>GIFT CARD</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="/cliente/contacto" onClick={handleLinkClick }>CONTACTO</NavLink>
            </li>

            <li className='item_container submenu-item'>

              <NavLink className='item' to="/cliente/inicio" onClick={(e) => {
                if (window.innerWidth <= 768) {
                  e.preventDefault(); // evita navegar en mobile
                  setSubMenuOpen(!subMenuOpen);
                }
              }}>
                <i className="logo_user_nav fa-regular fa-circle-user"></i>
              </NavLink>

               
                <ul className={`container_subMenu ${subMenuOpen ? "open-mobile" : ""}`}>
                  <li className='item_subMenu'>
                    <NavLink to={`/cliente/datos-personales/${idUsuario}`} onClick={handleLinkClick }>Datos personales</NavLink>
                  </li>
                  <li className='item_subMenu'>
                    <NavLink to={`/cliente/cambiar-password/${idUsuario}`} onClick={handleLinkClick }>Cambiar contraseña</NavLink>
                  </li>
                  <li className='item_subMenu'>
                    <button onClick={cerrarSesionUsuario}>Cerrar sesión</button>
                  </li>
                </ul>
              

            </li>

          </ul>

        </nav>

      </div>
    </header>
  )
}
