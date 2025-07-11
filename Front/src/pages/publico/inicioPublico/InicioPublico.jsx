import React from 'react'
import { Hero } from '../../../components/iu/hero/Hero'
import { Spinner } from '../../../components/iu/spinner/Spinner'
import { MessageError } from '../../../components/iu/messages/MessageError'
import { useNavigate } from 'react-router-dom'
import '../../../components/iu/hero/hero.css'
import './inicioPublico.css'
import { ContainerCards } from '../../../components/iu/cards/ContainerCards'
import { useServicios } from '../../../hooks/useServicios'
import { useEffect } from 'react'
import { ServicioIconInicio } from '../../../components/servicio/iconServicio/ServicioIconInicio'
import UñasImg from '../../../assets/imgServicios/Uñas.jpg';
import PestañasImg from '../../../assets/imgServicios/Pestañas.jpg';
import CejasImg from '../../../assets/imgServicios/Perfilado.jpg';
import PiesImg from '../../../assets/imgServicios/Pies.jpg';
import { ItemCaracteristica } from '../../../components/servicio/itemCaracteristica/ItemCaracteristica'

export const InicioPublico = () => {
  const { error, servicios, loading, serviciosPorCategoria } = useServicios();
  const navigate = useNavigate();

  useEffect(() => {
    serviciosPorCategoria(5);
  }, []);

  const realizarReserva = (servicio) => {
    navigate(`/fecha-hora/crear/${servicio.id}`);
  }

  const verTodosLosServicios = () => {
    navigate('/servicios');
  }

  const optionsServiciosIcon = [
    { name: "Uñas", ruta: "/servicios/1", srcImg: UñasImg },
    { name: "Pestañas", ruta: "/servicios/2", srcImg: PestañasImg },
    { name: "Cejas", ruta: "/servicios/3", srcImg: CejasImg },
    { name: "Pies", ruta: "/servicios/4", srcImg: PiesImg }
  ];

  const caracteristicas = [
    { icon: "fa-regular fa-star", caracteristica: "Experiencia", description: "Años de trabajo nos respaldan. Sabemos lo que hacemos y cómo cuidarte." },
    { icon: "fa-regular fa-clock", caracteristica: "Puntualidad", description: "Valoramos tu tiempo y nos aseguramos de mantener nuestros horarios." },
    { icon: "fa-solid fa-shield-halved", caracteristica: "Seguridad", description: "Tu bienestar es nuestra prioridad. Cuidamos cada detalle para que te sientas segura y tranquila." }
  ]


  /*Animacion*/

  const elementosAnimados = [
    { claseObjetivo: '.titel_bienvenida', claseAnimacion: 'desde_izquierda_rapido' },
    { claseObjetivo: '.parrafo_bienvenida', claseAnimacion: 'desde_izquierda_lento' }
  ];

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        const elemento = entrada.target;
        const claseAnimacion = elemento.dataset.claseAnimacion;
        elemento.classList.add(claseAnimacion);
        observador.unobserve(elemento);
      }
    });
  }, { threshold: 0.1 }); // 0.2 significa que el 20% del elemento debe estar visible


  elementosAnimados.forEach(({ claseObjetivo, claseAnimacion }) => {
    const elemento = document.querySelector(claseObjetivo);
    if (elemento) {
      elemento.dataset.claseAnimacion = claseAnimacion;
      observador.observe(elemento);
    }
  });

  return (
    <div className='container_page'>
      <Hero textHero={"Tus manos, tu sello personal"}
        description={'En CTV WAPA transformamos cada uña en una obra de arte. Manicura profesional con estilo, precisión y actitud.'}
        btn_action={verTodosLosServicios}
        variant_position={"container_info_inicio"}
      />

      <section className='container_bienvenida'>

        <h2 className='titel_bienvenida'>Bienvenida</h2>
        <p className='parrafo_bienvenida'>En CTV WAP nos especializamos en realzar la belleza de tus manos con estilo, dedicación y precisión. Con más de 4 años de experiencia en el rubro y en pleno crecimiento, ofrecemos una experiencia única en manicura que combina técnicas profesionales, un ambiente personalizado y resultados que realmente perduran.
          Nos distingue la atención al detalle, el trato cercano y la durabilidad de nuestras uñas, pensadas para acompañarte por más tiempo sin perder el estilo.
          Sumate a nuestra comunidad y date ese gusto que te merecés.</p>

      </section>

      <section className='container_servicios_favoritos'>


        <div className='container_text_servicio_favoritos'>
          <h2>Favoritos de nuestras clientas</h2>
        </div>

        <ContainerCards data={servicios} action_btn={realizarReserva} />

        {loading && <Spinner />}

        {error && (<MessageError error={error} />)}

      </section>

      <section className='serviciosPreviwe_container'>

        <h2>Nuestros servicios</h2>

        <div className='container_icons_serviciosPreviwe'>
          {optionsServiciosIcon.map(opt =>
            <ServicioIconInicio key={opt.name} text={opt.name} ruta={opt.ruta} src_img={opt.srcImg} />
          )}
        </div>

      </section>


      <section className='caracteristicas_container'>
        {caracteristicas.map(carc =>
          <ItemCaracteristica key={carc.caracteristica} class_icon={carc.icon} text_item={carc.caracteristica} description={carc.description} />
        )}
      </section>

    </div>
  )
}
