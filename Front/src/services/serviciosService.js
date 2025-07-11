export async function createServicio(servicio) {
  console.log(servicio);
  const response = await fetch('http://localhost:5164/api/Servicio/Agregar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(servicio),
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


export async function deleteServicio(id) {
  const response = await fetch(`http://localhost:5164/api/Servicio/${id}`, {
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

export async function updateServicio(servicioModificado) {
  console.log("entro al fetch update");
  console.log(servicioModificado);
  const response = await fetch(`http://localhost:5164/api/Servicio/${servicioModificado.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(servicioModificado),
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



export async function getAllServicio() {
  //await new Promise(resolve => setTimeout(resolve, 2000)); prueba del spinner

  const response = await fetch('http://localhost:5164/api/Servicio'); //'http://localhost:5164/api/Servicio'*/} {/*http://webapictvwapa.azurewebsites.net/api/Servicio*/}

  if (!response.ok) {
    let customMessage = "Servidor fuera de servicio";

    throw {
      status: response.status,
      message: customMessage,
    };
  }

  return await response.json();
}


export async function getByIdServicio(id) {
  //await new Promise(resolve => setTimeout(resolve, 2000)); prueba del spinner

  const response = await fetch(`http://localhost:5164/api/Servicio/${id}`); //'http://localhost:5164/api/Servicio'*/} {/*http://webapictvwapa.azurewebsites.net/api/Servicio*/}

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

  return await response.json();
}

export async function getByCategory(categoria) {
  //await new Promise(resolve => setTimeout(resolve, 2000)); prueba del spinner

  const response = await fetch(`http://localhost:5164/api/Servicio/Categoria/${categoria}`); //'http://localhost:5164/api/Servicio'*/} {/*http://webapictvwapa.azurewebsites.net/api/Servicio*/}

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