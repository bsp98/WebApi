import { urlBaseService } from "./urlBaseService";
const {urlBase} = urlBaseService();

export async function createCliente(cliente,token) {
  const response = await fetch(`${urlBase}api/Usuario/Registro`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cliente),
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

  return await response.text();
}

export async function deleteCliente(id,token) {
  console.log("id y token para eliminar",token);
  const response = await fetch(`${urlBase}api/Usuario/${id}`, {
    method: 'DELETE',
     headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
     }
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
}


export async function getAllCliente(token) {
  //await new Promise(resolve => setTimeout(resolve, 2000)); prueba del spinner

  const response = await fetch(`${urlBase}api/Usuario`,{
    method: "GET",
     headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
     }
  });

  if (!response.ok) {
    let customMessage = "Servidor fuera de servicio";

    throw {
      status: response.status,
      message: customMessage,
    };
  }

  return await response.json();
}

export async function getByIdCliente(id,token) {

  const response = await fetch(`${urlBase}api/Usuario/${id}`,{
    method: "GET",
     headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
     }
  });

  if (!response.ok) {
    let customMessage = "Servidor fuera de servicio";

    switch (response.status) {
      case 404:
        customMessage = await response.text();
        break;

      case 400:
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

export async function getByFilter(filtros,token) {
  const params = new URLSearchParams();
  // Agregamos 'nombre' solo si tiene valor (no null ni vacío)
  if (filtros.nombre) {
    params.append("nombre", filtros.nombre);
  }

  if (filtros.celular) {
    params.append("celular", filtros.celular);
  }

  // Agregamos 'fecha' solo si tiene valor válido
  if (filtros.fecha) {
    params.append("fecha", filtros.fecha);
  }

  const response = await fetch(`${urlBase}api/Usuario/Filtrar?${params.toString()}`,{
    method: "GET",
     headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
     }
  });
console.log("Entroooo")
  if (!response.ok) {
    let customMessage = "Servidor fuera de servicio";


    throw {
      status: response.status,
      message: customMessage,
    };
  }

  return await response.json();
}

export async function getClientesPaginados(page, pageSize,token) {
  //await new Promise(resolve => setTimeout(resolve, 2000)); prueba del spinner

  const params = new URLSearchParams();

  //Se agrega el numero de pagina solo si tiene un valor valido
  if (page) {
    params.append("page", page);
  }

  //Se agrega el tamaño de elementos de la pagina solo si tiene un valor valido
  if (pageSize) {
    params.append("pageSize", pageSize);
  }

  const response = await fetch(`${urlBase}api/Usuario/Paginado?${params.toString()}`,{
    method: "GET",
     headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
     }
  });

  if (!response.ok) {
    let customMessage = "Servidor fuera de servicio";


    throw {
      status: response.status,
      message: customMessage,
    };
  }

  const datos = await response.json()


  return datos;
}
