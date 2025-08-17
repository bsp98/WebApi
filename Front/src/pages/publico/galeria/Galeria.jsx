import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import './galeria.css'
import { Hero } from '../../../components/iu/hero/Hero'
import { Filter } from '../../../components/iu/filter/Filter'
import { MessageError } from '../../../components/iu/messages/MessageError'
import { Spinner } from '../../../components/iu/spinner/Spinner'
import { Modal } from '../../../components/iu/messages/Modal'
import { usePublicaciones } from "../../../hooks/usePublicaciones";
import { useNavigate } from 'react-router-dom'
import { ButtonRedirect } from "../../../components/iu/buttons/ButtonRedirect";
import { useAuth } from '../../../hooks/useAuth'

export const Galeria = () => {
  const { error,successMessage,loading, publicaciones, publicacionPorCategoria, eliminarPublicacion, limpiarMensajeExito} = usePublicaciones();
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const rol = usuario?.rolUsuario || null;


  useEffect(() => {
    publicacionPorCategoria(0);
  }, []);


  const slides = publicaciones.map((pub) => ({
    src: pub.imagenUrl,
     title: pub.titulo, 
     description: pub.descripcion,
  }));

  const agregarPublicacion = () => {
    navigate('/admin/alta-publicacion');
  }

  const optionsFilter = [
    { name: "TODOS", value: 0 },
    { name: "UÑAS", value: 1 },
    { name: "PESTAÑAS", value: 2 },
    { name: "CEJAS", value: 3 },
    { name: "PIES", value: 4 },
    { name: "PROMOS", value: 5 }
  ]


  return (
    <div className='container_page'>

      <Hero textHero={"GALERÍA"} />

      <Filter optionFilter={optionsFilter} onFilter={publicacionPorCategoria} />

      <div className="container_galeria">
        {console.log("publicaciones que se renderian",publicaciones)}

        {publicaciones.map((pub, index) => (
          <div className="container_image_galeria" key={pub.id || index}>

            <img
              className="imagen_galeria"
              src={pub.imagenUrl}
              alt={pub.titulo || `Imagen ${index + 1}`}
              onClick={() => {
                setPhotoIndex(index);
                setOpen(true);
              }}
            />

            <div className="footer_image_galeria">

              <div className="footer_info_imagen">
                <p className="title_img">{pub.titulo}</p>
                <p className="descripcion_img">{pub.descripcion}</p>
              </div>

              {rol === "Administrador" &&
                <button className="btn_footer_img" onClick={() => eliminarPublicacion({
                  id: pub.id,
                  categoria: pub.categoria
                })}
                >
                  <i className="icon_delete_img fa-solid fa-trash-can"></i>
                </button>
              }

            </div>

          </div>

        ))}

        {loading && <Spinner />}

      </div>


      {/* plugins={[Thumbnails, Captions]}*/}
      {/* Lightbox */}
      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          plugins={[Captions]}
          index={photoIndex}
          on={{
            view: ({ index }) => setPhotoIndex(index),
          }}
        />
      )}

      {error && (<MessageError error={error} />)}

      {successMessage && (
        <Modal mensaje={successMessage} alCerrar={limpiarMensajeExito} />
      )}


      {rol === "Administrador" && <ButtonRedirect textBtn={"AGREGAR PUBLICACIÓN"} btn_variant={"btn_primary "} width_btn={"btn_small"} actionRedirect={agregarPublicacion} />}

    </div>
  );
}
