export async function enviarMensajeContacto(mensaje) {
  console.log("mensaje a enviar",mensaje);
  /*const response = await fetch('http://localhost:5164/api/Notificacion/mensaje-contacto', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mensaje),
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

  return await response.text();*/
  return "el mensaje fue enviado correctamente"
}
