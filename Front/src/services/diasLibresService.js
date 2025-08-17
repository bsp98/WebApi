import { urlBaseService } from "./urlBaseService";
const {urlBase} = urlBaseService();


export async function createDiaLibre(diaLibre) {


  const response = await fetch(`${urlBase}api/DiaNoLaborable/Agregar`, {
    method: 'POST',
    credentials: "include",
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

export async function deleteDiaLibre(id) {
  const response = await fetch(`${urlBase}api/DiaNoLaborable/${id}`, {
    credentials: "include",
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

  return await response.text(); 
}

export async function getAllDiaLibre() {

  const response = await fetch(`${urlBase}/DiaNoLaborable`,{
    method: "GET",
    credentials: "include",
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