//Login convencional

export async function loginUser({ email, password }) {
      console.log("Probando login fake...");

  // Simulá respuesta exitosa
  return {
    accesoToken: "fake-token-123",
    idUsuario: 1,
    rolUsuario: email.includes("admin") ? "admin" : "cliente", // según el mail decide el rol
  };
    // return { accesoToken: "este es el token recibido", rolUsuario: "Admin", idUsuario: 1 }

   /* throw {
        status: 200,
        message: "Credenciales invalidas",
    };*/

    /*
    const response = await fetch('http://localhost:5164/api/Usuario/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        let customMessage = "Servidor fuera de servicio";

        switch (response.status) {
            case 401:
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

//Login gooogle
export async function loginConGoogle(tokenGoogle) {
    console.log("token de google fetch:",tokenGoogle);
  /*  const response = await fetch('http://localhost:5164/api/Autenticacion/GoogleLogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokenGoogle }),
    });

    if (!response.ok) {
        let customMessage = "Servidor fuera de servicio";

        switch (response.status) {
            case 401:
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

export async function registroUser(datosUsuario) {
    return { accesoToken: "este es el token recibido", rolUsuario: "Cliente", idUsuario: 2 }

    /* throw {
         status: 200,
         message: "Registro exitoso",
     };*/

    /* const response = await fetch('http://localhost:5164/api/Usuario/Registro', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify(datosUsuario),
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
 
     return await response.text();*/
}



export async function logout(datosUsuario) {
    return "logout exitoso"

    /* throw {
         status: 200,
         message: "Credenciales invalidas",
     };*/

    /*const response = await fetch('http://localhost:5164/api/Usuario/Logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosUsuario),
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

    return await response.text();*/
}