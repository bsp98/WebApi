import React from 'react';
import './avisoLegal.css';

export const AvisoLegal = () => {
  return (
    <div className="legal_container">
      <h1 className="legal_title">Aviso Legal</h1>

      <section className="legal_section">
        <h2>Objeto</h2>
        <p>
          Este sitio web es operado por una persona física residente en Uruguay. 
          El presente Aviso Legal regula el acceso y uso del sitio web. 
          El uso del mismo implica la aceptación plena de estas condiciones.
        </p>
      </section>

      <section className="legal_section">
        <h2>Propiedad Intelectual</h2>
        <p>
          Todos los contenidos del sitio (textos, imágenes, logotipos) son propiedad 
          del titular o de terceros autorizados, y no pueden ser reproducidos sin autorización expresa.
        </p>
      </section>

      <section className="legal_section">
        <h2>Limitación de Responsabilidad</h2>
        <p>
          - El titular no será responsable por el mal uso del sitio web por parte de los usuarios.<br/>
          - No se garantiza la disponibilidad permanente del sitio.<br/>
          - No se asume responsabilidad por contenidos de sitios externos enlazados.
        </p>
      </section>

      <section className="legal_section">
        <h2>Legislación Aplicable</h2>
        <p>Estas condiciones se rigen por las leyes de la República Oriental del Uruguay.</p>
      </section>
    </div>
  );
}
