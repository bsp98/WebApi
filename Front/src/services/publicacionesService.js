import { urlBaseService } from "./urlBaseService";
const {urlBase} = urlBaseService();

// export async function createPublicacion(publicacion,token) {
//  console.log(publicacion)
//   const response = await fetch(`${urlBase}api/Publicacion`, {
//     method: 'POST',
//     headers: {
//       "Authorization": `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(publicacion),
//   });

  export async function createPublicacion(publicacion, token) {
  const formData = new FormData();
  formData.append("Titulo", publicacion.titulo);
  formData.append("Descripcion", publicacion.descripcion);
  formData.append("Imagen", publicacion.imagen); // archivo tipo File
  formData.append("Categoria", publicacion.categoria); // ojo: si es enum int/string depende del backend
console.log(formData)
  const response = await fetch(`${urlBase}api/Publicacion`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      // ❌ no pongas Content-Type acá, fetch lo setea solo al usar FormData
    },
    body: formData,
  });

  
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

  return await response.json();
}

export async function getByCategory(id) {
  
  const response = await fetch(`${urlBase}api/Publicacion/categoria/${id}`);

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
  const publicaciones = await response.json()
  console.log("publicaciones obtenidas servicio",publicaciones)
    return publicaciones;
}


export async function deletePublicacion(id,token) {

  console.log(id)

    const response = await fetch(`${urlBase}api/Publicacion/${id}`, {
      method: 'DELETE',
       headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    });
  
    if (!response.ok) {
      let customMessage = "Servidor fuera de servicio";
  
      switch (response.status) {
        case 404:
          customMessage = await response.text();
          break;
      }
  
      throw {
        status: response.status,
        message: customMessage,
      };
    }
  
    return await response.text(); // se retorna el mensaje devuelto

}