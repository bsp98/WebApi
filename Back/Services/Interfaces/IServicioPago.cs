using Domain.Dto;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IServicioPago
    {
        Task<CrearPreferenciaResultado> CrearPreferenciaAsync(CrearPagoDto dto);
        Task<Pago?> ObtenerPorPrefAsync(string preferenceId);
        Task ProcesarWebhookAsync(string? type, long? dataId, long? idV1, string? topic);
    }
}
