export async function createServicio(servicio) {
    const response = await fetch('http://localhost:5164/api/Servicio/Agregar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(servicio),
    });

    if (!response.ok) {
        let customMessage = "Ocurrió un error no contemplado";

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
