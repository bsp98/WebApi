import { urlBaseService } from "./urlBaseService";
const {urlBase} = urlBaseService();

//Login convencional

export async function loginUser({ email, password }) {
    console.log("datos para la peticion", { email, password })

    const response = await fetch(`${urlBase}api/Autenticacion/Login`, { /*  login azure 'https://webapictvwapa.azurewebsites.net/api/Autenticacion/Login'
                                                                                                        login local 'http://localhost:5164/api/Autenticacion/Login'*/
        method: 'POST',
        credentials: 'include',
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

    return await response.json();
}

//Login gooogle
export async function loginConGoogle(IdToken) {
    const response = await fetch(`${urlBase}api/Autenticacion/GoogleLogin`, { /*  login azure 'https://webapictvwapa.azurewebsites/api/Autenticacion/GoogleLogin'
                                                                                                        login local http://localhost:5164/api/Autenticacion/GoogleLogin*/
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

    /*const mensaje = await response.text();
    console.log("mensaje del estatus 400",mensaje)*/

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
        method: 'POST',
        credentials: 'include',
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