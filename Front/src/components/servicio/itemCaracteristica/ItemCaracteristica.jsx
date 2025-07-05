import './itemCaracteristica.css'
import React, { useRef, useEffect } from 'react';

export const ItemCaracteristica = ({ class_icon, text_item, description }) => {
  const iconRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();


  /*Animacion*/

  useEffect(() => {

    const elementosAnimados = [
      { refObjetivo: iconRef, claseAnimacion: 'desde_arriba' },
      { refObjetivo: titleRef, claseAnimacion: 'desde_izquierda_rapido' },
      { refObjetivo: descriptionRef, claseAnimacion: 'desde_izquierda_lento' }
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


    elementosAnimados.forEach(({ refObjetivo, claseAnimacion }) => {

      if (refObjetivo.current) {
        refObjetivo.current.dataset.claseAnimacion = claseAnimacion;
        observador.observe(refObjetivo.current);
      }
    });

  }, []);


  return (
    <div className='container_itemCaracteristica'>

      <i ref={iconRef} className={`icon_item ${class_icon}`}></i>

      <h3 ref={titleRef} >{text_item}</h3>

      <p ref={descriptionRef} >{description}</p>

    </div>
  )
}
