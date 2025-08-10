export async function getResumenEstadisticas(anio) {
    console.log("entro a la peticion de estadisticas");
    const params = new URLSearchParams();

    if (anio) {
        params.append("anio", anio);
    }

    const response = await fetch(
        `http://localhost:5164/api/Estadisticas/resumen?${params.toString()}`,
        {
            method: 'GET',
            credentials: 'include',
            headers: {
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