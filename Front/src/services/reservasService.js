export async function createReserva(reserva) {
  console.log(reserva);
  const response = await fetch('http://localhost:5164/api/Usuario/cliente', {
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
    }

    throw {
      status: response.status,
      message: customMessage,
    };
  }

  return await response.json();
}


export async function deleteReserva(id) {
  /*
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

  return await response.text(); // se retorna el mensaje devuelto*/
  return "Reserva cancelada con exito"
}

export async function reagendarReserva({idReserva,fecha,horaInicio}) {

  const response = await fetch(`http://localhost:5164/api/Reservas/${idReserva}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({fecha,horaInicio}),
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

export async function getByIdReserva(id) {
  //await new Promise(resolve => setTimeout(resolve, 2000)); prueba del spinner
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay

  return {
      id: 1,
      fecha: "2025-06-24",
      horaInicio: "09:00",
      horaFin: "11:00",
      estadoDePago: 2,
      nombreEstadoDePago: "Total",
      cliente: {
        id: 12,
        nombre: "Aura",
        apellido: "Ledesma",
        email: "teclaguzman@hotmail.com",
        password: "1234",
        origenCreacion: null,
        fechaDeNacimiento: "1956-08-01T00:00:00",
        celular: "090633470",
        activo: true
      },
      servicio: {
        id: 3,
        nombre: "Perfilado",
        descripcion: "Este es un perfilado de cejas",
        precio: 600,
        descuento: 0,
        disponibilidad: 1,
        categoria: 3,
        categoriaNombre: "Cejas",
        disponibilidadNombre: "Activo",
        tiempoDeDuracionMin: 120,
        precioTotal: 600
      }
    }
  }
/*
  const response = await fetch(`http://localhost:5164/api/Reserva/${id}`);

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
}*/

export async function getReservasByIdCliente(id) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay

  return [
    {
      id: 1,
      fecha: "2025-06-24",
      horaInicio: "09:00",
      horaFin: "11:00",
      estadoDePago: 2,
      nombreEstadoDePago: "Total",
      cliente: {
        id: 12,
        nombre: "Aura",
        apellido: "Ledesma",
        email: "teclaguzman@hotmail.com",
        password: "1234",
        origenCreacion: null,
        fechaDeNacimiento: "1956-08-01T00:00:00",
        celular: "090633470",
        activo: true
      },
      servicio: {
        id: 3,
        nombre: "Perfilado",
        descripcion: "Este es un perfilado de cejas",
        precio: 600,
        descuento: 0,
        disponibilidad: 1,
        categoria: 3,
        categoriaNombre: "Cejas",
        disponibilidadNombre: "Activo",
        tiempoDeDuracionMin: 120,
        precioTotal: 600
      }
    },
    {
      id: 2,
      fecha: "2025-06-24",
      horaInicio: "11:30",
      horaFin: "12:00",
      estadoDePago: 1,
      nombreEstadoDePago: "Parcial",
      cliente: {
        id: 15,
        nombre: "Valentina",
        apellido: "Rodríguez",
        email: "valen.rodri@gmail.com",
        password: "abcd1234",
        origenCreacion: "web",
        fechaDeNacimiento: "1998-05-20T00:00:00",
        celular: "097654321",
        activo: true
      },
      servicio: {
        id: 5,
        nombre: "Depilación Láser",
        descripcion: "Eliminación del vello con tecnología láser",
        precio: 1800,
        descuento: 10,
        disponibilidad: 2,
        categoria: 2,
        categoriaNombre: "Depilación",
        disponibilidadNombre: "Disponible",
        tiempoDeDuracionMin: 30,
        precioTotal: 1620
      }
    },

  ];



  /*const response = await fetch(`http://localhost:5164/api/Servicio/${id}`);

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

  return await response.json();*/
}

export async function getByFilter(filtros)
{
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay

  return [
    {
      id: 1,
      fecha: "2025-06-24",
      horaInicio: "09:00",
      horaFin: "11:00",
      estadoDePago: 2,
      nombreEstadoDePago: "Total",
      cliente: {
        id: 12,
        nombre: "Aura",
        apellido: "Ledesma",
        email: "teclaguzman@hotmail.com",
        password: "1234",
        origenCreacion: null,
        fechaDeNacimiento: "1956-08-01T00:00:00",
        celular: "090633470",
        activo: true
      },
      servicio: {
        id: 3,
        nombre: "Perfilado",
        descripcion: "Este es un perfilado de cejas",
        precio: 600,
        descuento: 0,
        disponibilidad: 1,
        categoria: 3,
        categoriaNombre: "Cejas",
        disponibilidadNombre: "Activo",
        tiempoDeDuracionMin: 120,
        precioTotal: 600
      }
    },
    {
      id: 2,
      fecha: "2025-06-24",
      horaInicio: "11:30",
      horaFin: "12:00",
      estadoDePago: 1,
      nombreEstadoDePago: "Parcial",
      cliente: {
        id: 15,
        nombre: "Valentina",
        apellido: "Rodríguez",
        email: "valen.rodri@gmail.com",
        password: "abcd1234",
        origenCreacion: "web",
        fechaDeNacimiento: "1998-05-20T00:00:00",
        celular: "097654321",
        activo: true
      },
      servicio: {
        id: 5,
        nombre: "Depilación Láser",
        descripcion: "Eliminación del vello con tecnología láser",
        precio: 1800,
        descuento: 10,
        disponibilidad: 2,
        categoria: 2,
        categoriaNombre: "Depilación",
        disponibilidadNombre: "Disponible",
        tiempoDeDuracionMin: 30,
        precioTotal: 1620
      }
    },

  ];
}

/*{
  const params = new URLSearchParams();

  // Agregamos 'nombre' solo si tiene valor (no null ni vacío)
  if (filtros.nombre) {
    params.append("nombre", filtros.nombre);
  }

  // Agregamos 'fecha' solo si tiene valor válido
  if (filtros.fecha) {
    params.append("fecha", filtros.fecha);
  }

  const response = await fetch(`http://localhost:5164/api/Usuario/Filtrar?${params.toString()}`); //'http://localhost:5164/api/Servicio'*/ {/*http://webapictvwapa.azurewebsites.net/api/Servicio*/}

 /* if (!response.ok) {
    let customMessage = "Servidor fuera de servicio";

    throw {
      status: response.status,
      message: customMessage,
    };
  }

  return await response.json();
}*/

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


export async function getAvailableTimes(fecha, duracion) {
  await new Promise(resolve => setTimeout(resolve, 2000)); // simula delay del backend

  return [
    { horaInicio: "08:00", horaFin: "08:10" },
    { horaInicio: "08:10", horaFin: "08:20" },
    { horaInicio: "08:20", horaFin: "08:30" },
    { horaInicio: "08:30", horaFin: "08:40" },
    { horaInicio: "08:40", horaFin: "08:50" },
     { horaInicio: "08:50", horaFin: "09:00" },
     { horaInicio: "09:00", horaFin: "09:10" },
     { horaInicio: "09:10", horaFin: "09:20" },
     { horaInicio: "09:20", horaFin: "09:30" },
     { horaInicio: "09:30", horaFin: "09:40" },
     { horaInicio: "09:40", horaFin: "09:50" },
     { horaInicio: "09:50", horaFin: "10:00" },
     { horaInicio: "10:00", horaFin: "10:10" },
     { horaInicio: "10:10", horaFin: "10:20" },
     { horaInicio: "10:20", horaFin: "10:30" },
     { horaInicio: "10:30", horaFin: "10:40" },
     { horaInicio: "10:40", horaFin: "10:50" },
     { horaInicio: "10:50", horaFin: "11:00" },
     { horaInicio: "11:00", horaFin: "11:10" },
     { horaInicio: "11:10", horaFin: "11:20" },
     { horaInicio: "11:20", horaFin: "11:30" },
     { horaInicio: "11:30", horaFin: "11:40" },
     { horaInicio: "11:40", horaFin: "11:50" },
     { horaInicio: "11:50", horaFin: "12:00" },
     { horaInicio: "12:00", horaFin: "12:10" },
     { horaInicio: "12:10", horaFin: "12:20" },
     { horaInicio: "12:20", horaFin: "12:30" },
     { horaInicio: "12:30", horaFin: "12:40" },
     { horaInicio: "12:40", horaFin: "12:50" },
     { horaInicio: "12:50", horaFin: "13:00" },
     { horaInicio: "13:00", horaFin: "13:10" },
     { horaInicio: "13:10", horaFin: "13:20" },
     { horaInicio: "13:20", horaFin: "13:30" },
     { horaInicio: "13:30", horaFin: "13:40" },
     { horaInicio: "13:40", horaFin: "13:50" },
     { horaInicio: "13:50", horaFin: "14:00" }
  ];
}

export async function getReservasByDate(fecha) {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay

  return [
    {
      id: 1,
      fecha: "2025-06-24",
      horaInicio: "09:00",
      horaFin: "11:00",
      estadoDePago: 2,
      nombreEstadoDePago: "Total",
      cliente: {
        id: 12,
        nombre: "Aura",
        apellido: "Ledesma",
        email: "teclaguzman@hotmail.com",
        password: "1234",
        origenCreacion: null,
        fechaDeNacimiento: "1956-08-01T00:00:00",
        celular: "090633470",
        activo: true
      },
      servicio: {
        id: 3,
        nombre: "Perfilado",
        descripcion: "Este es un perfilado de cejas",
        precio: 600,
        descuento: 0,
        disponibilidad: 1,
        categoria: 3,
        categoriaNombre: "Cejas",
        disponibilidadNombre: "Activo",
        tiempoDeDuracionMin: 120,
        precioTotal: 600
      }
    },
    {
      id: 2,
      fecha: "2025-06-24",
      horaInicio: "11:30",
      horaFin: "12:00",
      estadoDePago: 1,
      nombreEstadoDePago: "Parcial",
      cliente: {
        id: 15,
        nombre: "Valentina",
        apellido: "Rodríguez",
        email: "valen.rodri@gmail.com",
        password: "abcd1234",
        origenCreacion: "web",
        fechaDeNacimiento: "1998-05-20T00:00:00",
        celular: "097654321",
        activo: true
      },
      servicio: {
        id: 5,
        nombre: "Depilación Láser",
        descripcion: "Eliminación del vello con tecnología láser",
        precio: 1800,
        descuento: 10,
        disponibilidad: 2,
        categoria: 2,
        categoriaNombre: "Depilación",
        disponibilidadNombre: "Disponible",
        tiempoDeDuracionMin: 30,
        precioTotal: 1620
      }
    },
    {
      id: 3,
      fecha: "2025-06-24",
      horaInicio: "12:15",
      horaFin: "13:15",
      estadoDePago: 0,
      nombreEstadoDePago: "Pendiente",
      cliente: {
        id: 17,
        nombre: "Martín",
        apellido: "González",
        email: "martin.gon@example.com",
        password: "clave123",
        origenCreacion: "admin",
        fechaDeNacimiento: "1987-10-10T00:00:00",
        celular: "091234567",
        activo: false
      },
      servicio: {
        id: 6,
        nombre: "Limpieza Facial",
        descripcion: "Tratamiento para limpieza profunda de la piel",
        precio: 1300,
        descuento: 5,
        disponibilidad: 3,
        categoria: 1,
        categoriaNombre: "Faciales",
        disponibilidadNombre: "Con agenda",
        tiempoDeDuracionMin: 60,
        precioTotal: 1235
      }
    }
  ];
}

/*export async function getAvailableTimes(fecha,duracion) {
  //await new Promise(resolve => setTimeout(resolve, 2000)); prueba del spinner

  const params = new URLSearchParams();
    params.append("fecha",page);
    params.append("duracion",pageSize);

  const response = await fetch(`http://localhost:5164/api/Usuario/Paginado?${params.toString()}`);

  if (!response.ok) {
    let customMessage = "Servidor fuera de servicio";


    throw {
      status: response.status,
      message: customMessage,
    };
  }

  const datos = await response.json()

  return datos
}*/


export async function ModifyPaymentStatus(estadoDePago) {
/*
  const response = await fetch(`http://localhost:5164/api/Reservas/${idReserva}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({estadoDePago}),
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

  return await response.text();*/
  return "estado de pago modificado con exito";
}