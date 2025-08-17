export async function createCliente(cliente) {
  console.log(cliente);
  const response = await fetch('http://localhost:5164/api/Usuario/Registro', {
    method: 'POST',
    headers: {
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

  return await response.json();
}

//FALTA VALIDAR EN EL THUNK QUE SE REFRESQUE LOS CLIENTE DEPSUES DE ELIMINAR
export async function deleteCliente(id) {
  const response = await fetch(`http://localhost:5164/api/Usuario/${id}`, {
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

  return await response.text(); // se retorna el mensaje devuelto
}


export async function getAllCliente() {
  //await new Promise(resolve => setTimeout(resolve, 2000)); prueba del spinner

  const response = await fetch('http://localhost:5164/api/Usuario'); //'http://localhost:5164/api/Servicio'*/} {/*http://webapictvwapa.azurewebsites.net/api/Servicio*/}

  if (!response.ok) {
    let customMessage = "Servidor fuera de servicio";

    throw {
      status: response.status,
      message: customMessage,
    };
  }

  return await response.json();
}

export async function getByIdCliente(id) {

  const response = await fetch(`http://localhost:5164/api/Usuario/${id}`,{
    method: "GET",
    credentials: "include",
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

export async function getByFilter(filtros) {
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

  const response = await fetch(`http://localhost:5164/api/Usuario/Filtrar?${params.toString()}`); //'http://localhost:5164/api/Servicio'*/} {/*http://webapictvwapa.azurewebsites.net/api/Servicio*/}

  if (!response.ok) {
    let customMessage = "Servidor fuera de servicio";


    throw {
      status: response.status,
      message: customMessage,
    };
  }

  return await response.json();
}

export async function getClientesPaginados(page, pageSize) {
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

  const response = await fetch(`http://localhost:5164/api/Usuario/Paginado?${params.toString()}`); //'http://localhost:5164/api/Servicio'*/} {/*http://webapictvwapa.azurewebsites.net/api/Servicio*/}

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
