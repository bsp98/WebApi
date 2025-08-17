export async function createPublicacion(publicacion) {

  const response = await fetch(`${urlBase}api/Publicacion`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(publicacion),
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
  
    return await response.json();
}

export async function deletePublicacion(id) {

    const response = await fetch(`${urlBase}api/Publicacion/${id}`, {
      method: 'DELETE',
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