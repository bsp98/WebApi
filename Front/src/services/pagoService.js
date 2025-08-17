export async function solicitarPagoMercadoPago(datosPago) {
    console.log("solicitud de pago, datos: ",datosPago)
/*
  const response = await fetch(`${urlBase}api/Pago/Agregar`, {
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

  return await response.json();*/
  return "https://www.elpais.com.uy/ovacion"
}