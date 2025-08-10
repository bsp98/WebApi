export async function createPublicacion(publicacion) {
  console.log("datos de publicacion creada ", publicacion);
/*
  const response = await fetch('http://localhost:5164/api/Publicacion/Agregar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(publicacion),
  });

  if (!response.ok) {
    let customMessage = "Servidor fuera de servicio";

    switch (response.status) {
      case 409:
        customMessage = await response.text();
        break;
      case 422:
        customMessage = await response.text();
        break;
    }

    throw {
      status: response.status,
      message: customMessage,
    };
  }

  return await response.json();*/
  return { id: 7, imagenUrl: "https://picsum.photos/600/400?random=101", titulo: publicacion.titulo, descripcion: publicacion.descripcion };
}

export async function getByCategory(categoria) {
  /*
    if (!response.ok) {
      let customMessage = "Servidor fuera de servicio";
  
      switch (response.status) {
        case 422:
          customMessage = await response.text();
          break;
      }
  
      throw {
        status: response.status,
        message: customMessage,
      };
    }
  
    return await response.json();*/

  const publicaciones = [
    { id: 1, imagenUrl: "https://picsum.photos/600/400?random=101", titulo: "Imagen 1", descripcion: "Descripción 1" },
    { id: 2, imagenUrl: "https://picsum.photos/600/400?random=102", titulo: "Imagen 2", descripcion: "Descripción 2" },
    { id: 3, imagenUrl: "https://picsum.photos/600/400?random=103", titulo: "Imagen 3", descripcion: "Descripción 3" },
    { id: 4, imagenUrl: "https://picsum.photos/600/400?random=104", titulo: "Imagen 4", descripcion: "Descripción 4" },
    { id: 5, imagenUrl: "https://picsum.photos/600/400?random=105", titulo: "Imagen 5", descripcion: "Descripción 5" },
    { id: 6, imagenUrl: "https://picsum.photos/600/400?random=106", titulo: "Imagen 6", descripcion: "Descripción 6" },
  ];

  return publicaciones;
}

export async function deletePublicacion(id) {
  console.log("id de la ublicacion a eliminar ", id);
  /*  const response = await fetch(`http://localhost:5164/api/Publicacion/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      let customMessage = "Servidor fuera de servicio";
  
      switch (response.status) {
        case 404:
          customMessage = await response.text();
          break;
        case 409:
          customMessage = await response.text();
          break;
      }
  
      throw {
        status: response.status,
        message: customMessage,
      };
    }
  
    return await response.text(); // se retorna el mensaje devuelto*/
  return "publicacion eliminada con exito"
}