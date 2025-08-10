export async function updatePassword({ passwordActual, nuevaPassword }) {

  const response = await fetch(`http://localhost:5164/api/Usuario/cambiar-password`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ passwordActual, nuevaPassword }),
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
  return await response.text();
}

export async function solicitarCodigo(email) {

  const response = await fetch('http://localhost:5164/api/Usuario/solicitar-codigo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
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

export async function recuperarPassword({ email, codigo, nuevaPassword }) {
  console.log("entro a recuperar password", { email, codigo, nuevaPassword })

  const response = await fetch(`http://localhost:5164/api/Usuario/olvido-password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, codigo, nuevaPassword }),
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
    }

    throw {
      status: response.status,
      message: customMessage,
    };
  }
  return await response.text();
}
