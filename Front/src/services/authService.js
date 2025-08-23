import { urlBaseService } from "./urlBaseService";
const {urlBase} = urlBaseService();

//Login convencional

//Login con Cookies

// export async function loginUser({ email, password }) {

//     const response = await fetch(`${urlBase}api/Autenticacion/Login`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) {
//         let customMessage = "Servidor fuera de servicio";

//         switch (response.status) {
//             case 401:
//                 customMessage = await response.text();
//                 break;
//         }

//         throw {
//             status: response.status,
//             message: customMessage,
//         };
//     }

//     return await response.json();
// }

//Login tradicional 
export async function loginUser({ email, password }) {
    const response = await fetch(`${urlBase}api/Autenticacion/Login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        let customMessage = "Servidor fuera de servicio";
        if (response.status === 401) {
            customMessage = await response.text();
        }
        throw { status: response.status, message: customMessage };
    }

    // Solo devolvemos los datos
    return await response.json();
}


//Login gooogle
export async function loginConGoogle(IdToken) {
    const response = await fetch(`${urlBase}api/Autenticacion/GoogleLogin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ IdToken }),
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
    console.log("respuesta de peticion", response);
    return await response.json();
}

export async function registroUser(datosUsuario) {

    const response = await fetch(`${urlBase}api/Usuario/Registro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosUsuario),
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



export async function logout() {

    const response = await fetch(`${urlBase}api/Autenticacion/Logout`, {
        method: 'POST'
    });

    if (!response.ok) {
        let customMessage = "Servidor fuera de servicio";

        throw {
            status: response.status,
            message: customMessage,
        };
    }

    return await response.text();
}