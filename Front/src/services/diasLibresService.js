export async function createDiaLibre(diaLibre) {
  console.log("dia libre que se agrega",diaLibre);
/*
  const response = await fetch('http://localhost:5164/api/DiaNoLaborable/Agregar', {
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

  return await response.json();*/
  return []
}

export async function deleteDiaLibre(id) {
  const response = await fetch(`http://localhost:5164/api/DiaNoLaborable/${id}`, {
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

export async function getAllDiaLibre() {
  //await new Promise(resolve => setTimeout(resolve, 2000)); prueba del spinner

  const response = await fetch('http://localhost:5164/api/DiaNoLaborable');

  if (!response.ok) {
    let customMessage = "Servidor fuera de servicio";

    throw {
      status: response.status,
      message: customMessage,
    };
  }

  return await response.json();
}