export async function getResumenEstadisticas(anio) {
    const params = new URLSearchParams();
    // Agregamos anio solamente si tiene valor
    if (anio) {
        params.append("anio", anio);
    }

    const response = await fetch(`ttp://localhost:5164/api/Estadisticas/resumen?${params.toString()}`);

    if (!response.ok) {
        let customMessage = "Servidor fuera de servicio";

        throw {
            status: response.status,
            message: customMessage,
        };
    }

    return await response.json();
}