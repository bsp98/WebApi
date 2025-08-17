import React from 'react';
import './politicaPrivacidad.css';

export const PoliticaPrivacidad = () => {
  return (
    <div className="legal_container">
      <h1 className="legal_title">Política de Privacidad</h1>

      <section className="legal_section">
        <h2>Responsable del Tratamiento</h2>
        <p>
          El responsable del tratamiento de los datos personales recabados a través de este sitio web es 
          <strong> Jenniffer González</strong>, persona física residente en Uruguay. 
          Puede contactarse al correo: <strong>ctvwapawapisima@gmail.com</strong>.
        </p>
      </section>

      <section className="legal_section">
        <h2>Finalidad del Tratamiento</h2>
        <p>
          Los datos proporcionados por los usuarios (como nombre, correo electrónico, teléfono u otros ingresados en formularios de contacto o reservas) 
          serán utilizados únicamente para: <br/>
          - Gestionar consultas o solicitudes.<br/>
          - Administrar reservas o servicios solicitados.<br/>
          - Mantener comunicación relacionada con los servicios ofrecidos.
        </p>
      </section>

      <section className="legal_section">
        <h2>Legitimación</h2>
        <p>
          El tratamiento de datos se basa en el consentimiento otorgado libremente por el usuario al enviar los formularios del sitio.
        </p>
      </section>

      <section className="legal_section">
        <h2>Conservación de los Datos</h2>
        <p>
          Los datos se conservarán únicamente durante el tiempo necesario para cumplir con la finalidad indicada, salvo obligación legal en contrario.
        </p>
      </section>

      <section className="legal_section">
        <h2>Derechos de los Usuarios</h2>
        <p>
          Los usuarios podrán ejercer sus derechos de acceso, rectificación, actualización, inclusión o supresión de sus datos personales, 
          de conformidad con la Ley 18.331, enviando un correo a <strong>ctvwapawapisima@gmail.com</strong>.
        </p>
      </section>

      <section className="legal_section">
        <h2>Medidas de Seguridad</h2>
        <p>
          Se aplican medidas técnicas y organizativas razonables para proteger los datos contra pérdida, acceso no autorizado, alteración o divulgación.
        </p>
      </section>
    </div>
  );
}
