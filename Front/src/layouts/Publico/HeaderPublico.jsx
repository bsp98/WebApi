import logo from '../../assets/logo/Logo.png'
import { NavLink } from 'react-router-dom';
import '../header.css'
import { useState,useEffect } from "react";

export const HeaderPublico = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false); // cierra el menú si la pantalla es mayor a tablet
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

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
              <NavLink className='item' to="/inicio" onClick={() => setMenuOpen(false)}>INICIO</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="/servicios" onClick={() => setMenuOpen(false)}>SERVICIOS</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="/galeria" onClick={() => setMenuOpen(false)}>GALERÍA</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="/gift-card" onClick={() => setMenuOpen(false)}>GIFT CARD</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="/contacto" onClick={() => setMenuOpen(false)}>CONTACTO</NavLink>
            </li>

            <li className='item_container'>
              <NavLink className='item' to="/login" onClick={() => setMenuOpen(false)}>INICIAR SESION</NavLink>
            </li>

          </ul>

        </nav>

      </div>

    </header >
  )
}
