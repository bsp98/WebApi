using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcces.Interfaces
{
    public interface IRepositorioPago
    {
        Task<Pago?> ObtenerPorPreferenceIdAsync(string preferenceId);
        Task<Pago?> ObtenerPorExternalRefAsync(string externalReference);
        Task AgregarAsync(Pago pago);
        Task ActualizarAsync(Pago pago);
    }
}
