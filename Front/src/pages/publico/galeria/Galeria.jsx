import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import './galeria.css'
import { Hero } from '../../../components/iu/hero/Hero'

export const Galeria = () => {
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const publicaciones = [
    { url: "https://picsum.photos/600/400?random=101", title: "Imagen 1", desc: "Descripción 1" },
    { url: "https://picsum.photos/600/400?random=102", title: "Imagen 2", desc: "Descripción 2" },
    { url: "https://picsum.photos/600/400?random=103", title: "Imagen 3", desc: "Descripción 3" },
    { url: "https://picsum.photos/600/400?random=104", title: "Imagen 4", desc: "Descripción 4" },
    { url: "https://picsum.photos/600/400?random=105", title: "Imagen 5", desc: "Descripción 5" },
    { url: "https://picsum.photos/600/400?random=106", title: "Imagen 6", desc: "Descripción 6" },
  ];


  const slides = publicaciones.map((pub) => ({
    src: pub.url,
    /* title: pub.title,        // para caption (opcional)
     description: pub.desc,   // para caption (opcional)*/
  }));
  return (
    <div className='container_page'>

      <Hero textHero={"GALERÍA"} />

      <div className="container_galeria">
        {publicaciones.map((pub, index) => (
          <img
          className="imagen_galeria"
            key={index}
            src={pub.url}
            alt={pub.title || `Imagen ${index + 1}`}
            onClick={() => {
              setPhotoIndex(index);
              setOpen(true);
            }}
          />
        ))}
      </div>
      {/* plugins={[Thumbnails, Captions]}*/}
      {/* Lightbox */}
      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          index={photoIndex}
          on={{
            view: ({ index }) => setPhotoIndex(index),
          }}
        />
      )}

    </div>
  );
}
