import { urlBaseService } from "./urlBaseService";
const { urlBase } = urlBaseService();

export async function createReserva(reserva) {

  const response = await fetch(`${urlBase}api/Reserva`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reserva),
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
      case 404:
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


export async function deleteReserva(id) {

  const response = await fetch(`${urlBase}api/Reserva/${id}`, {
    credentials: "include",
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

  return await response.text();
}

export async function reagendarReserva({ idReserva, fecha, horaInicio }) {

  const response = await fetch(`${urlBase}api/Reserva/${idReserva}/fechahora`, {
    credentials: "include",
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fecha, horaInicio }),
  });

  if (!response.ok) {
    let customMessage = "Servidor fuera de servicio";

    switch (response.status) {
      case 404:
        customMessage = await response.text();
        break;
      case 422:
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



export async function getAllReserva() {
  //await new Promise(resolve => setTimeout(resolve, 2000)); prueba del spinner

  const response = await fetch(`${urlBase}api/Usuario`, {
    method: 'GET',
    credentials: 'include',
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

export async function getByIdReserva(id) {

  const response = await fetch(`${urlBase}api/Reserva/${id}`,{
        method: 'GET',
        credentials: 'include',
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

  const datos = await response.json()
  return datos;
}


export async function getReservasByIdCliente(id) {
  const response = await fetch(`${urlBase}api/Reserva/Filtrar?clienteId=${id}`,{
        method: 'GET',
        credentials: 'include',
    });

  if (!response.ok) {
    let customMessage = "Servidor fuera de servicio";

    switch (response.status) {
      case 400:
        customMessage = await response.text();
        break;
    }

    throw {
      status: response.status,
      message: customMessage,
    };
  }

  const datos = await response.json()
  return datos;
}

export async function getByFilter(filtros,token) {
  {
    
    const params = new URLSearchParams();

    // Agregamos 'nombre' solo si tiene valor (no null ni vacío)
    if (filtros.nombre) {
      params.append("nombrecliente", filtros.nombre);
    }

    // Agregamos 'fecha' solo si tiene valor válido
    if (filtros.fecha) {
      params.append("fecha", filtros.fecha);
    }

    const response = await fetch(`${urlBase}api/Reserva/Filtrar?${params.toString()}`,{
        method: 'GET',
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
}




export async function getReservasPaginadas(page, pageSize) {
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

  const response = await fetch(`${urlBase}api/Usuario/Paginado?${params.toString()}`); //'${urlBase}api/Servicio'*/} {/*http://webapictvwapa.azurewebsites.net/api/Servicio*/}

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


export async function getAvailableTimes(fecha, duracion) {

  const params = new URLSearchParams();

  if (fecha) {
    params.append("fecha", fecha);
  }

  if (duracion) {
    params.append("duracionMinutos", duracion);
  }

  const response = await fetch(`${urlBase}api/Reserva/bloques-disponibles?${params.toString()}`); //'${urlBase}api/Servicio'*/} {/*http://webapictvwapa.azurewebsites.net/api/Servicio*/}

  if (!response.ok) {
    let customMessage = "Servidor fuera de servicio";

    switch (response.status) {
      case 404:
        customMessage = await response.text();
        break;
      case 422:
        customMessage = await response.text();
        console.log("el error entro del el 422", customMessage);
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

  const datos = await response.json()
  return datos;
}

export async function getReservasByDate(fecha,token) {
  const response = await fetch(`${urlBase}api/Reserva/Filtrar?fecha=${fecha}`,{

      headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  }}
  );

  if (!response.ok) {
    let customMessage = "Servidor fuera de servicio";

    switch (response.status) {
      case 400:
        customMessage = await response.text();
        break;
    }

    throw {
      status: response.status,
      message: customMessage,
    };
  }

  const datos = await response.json()
  return datos;
}



export async function ModifyPaymentStatus({ idReserva, estadoDePago }) {

  const response = await fetch(`${urlBase}api/Reserva/${idReserva}/EstadoDePago`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ estadoDePago }),
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
  return await response.text();
}