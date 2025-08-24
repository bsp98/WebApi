import { urlBaseService } from "./urlBaseService";
const {urlBase} = urlBaseService();

export async function createEgreso(egreso,token) {

  const response = await fetch(`${urlBase}api/Egreso/Agregar`, {
    method: 'POST',

    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(egreso),
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


export async function deleteEgreso(id,token) {
  const response = await fetch(`${urlBase}api/Egreso/${id}`, {

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
      case 409:
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


export async function getEgresosPaginados(page, pageSize,token) {
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

  const response = await fetch(`${urlBase}api/Egreso/Paginado?${params.toString()}`,{
    method: "GET",
     headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {

    throw {
      status: response.status,
      message: customMessage,
    };
  }

  const datos = await response.json()


  return datos;
}


export async function getByFilter(filtros,token) {
  const params = new URLSearchParams();

  // Agregamos 'nombre' solo si tiene valor (no null ni vacío)
  if (filtros.categoria) {
    params.append("categoriaEgreso", filtros.categoria);
  }

  // Agregamos 'fecha' solo si tiene valor válido
  if (filtros.fecha) {
    params.append("fecha", filtros.fecha);
  }

  const response = await fetch(`${urlBase}api/Egreso/Filtrar?${params.toString()}`,{
    method: "GET",
     headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
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