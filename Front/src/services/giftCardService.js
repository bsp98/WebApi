import { urlBaseService } from "./urlBaseService";
const {urlBase} = urlBaseService();

export async function solicitarGiftCard(datosGift) {
    console.log("solicitud de giftCard, datos: ",datosGift)

  const response = await fetch(`${urlBase}api/GiftCard/solicitar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosGift),
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