import { urlBaseService } from "./urlBaseService";
const {urlBase} = urlBaseService();


export async function solicitarPagoMercadoPago(datosPago) {
    console.log("solicitud de pago, datos: ",datosPago)

  const response = await fetch(`${urlBase}api/Pago/preferencias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosPago),
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


export async function configurarModoDePago(modo,token) {

  const response = await fetch(`${urlBase}api/ModoDePago/CambiarModo`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(modo),
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


export async function getModoDePago() {

  const response = await fetch(`${urlBase}api/ModoDePago/ObtenerModo`);

  if (!response.ok) {
    let customMessage = "Servidor fuera de servicio";

    throw {
      status: response.status,
      message: customMessage,
    };
  }

  return await response.json();
}