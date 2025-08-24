import { urlBaseService } from "./urlBaseService";
const {urlBase} = urlBaseService();

export async function getResumenEstadisticas(anio,token) {
    console.log("entro a la peticion de estadisticas");
    const params = new URLSearchParams();

    if (anio) {
        params.append("anio", anio);
    }

    const response = await fetch(
        `${urlBase}api/Estadisticas/resumen?${params.toString()}`,
        {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );

    if (!response.ok) {
        let customMessage = "Servidor fuera de servicio";

        throw {
            status: response.status,
            message: customMessage,
        };
    }

    return await response.json();
}