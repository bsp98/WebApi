using Azure;
using DataAcces.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcces.Repositories
{
    public class RepositorioPago : RepositorioGeneral<Pago>, IRepositorioPago
    {
        public RepositorioPago(DbContext contexto)
        {
            Contexto = contexto;
        }
        public async Task<Pago?> ObtenerPorPreferenceIdAsync(string preferenceId)
        {
            var set = Contexto.Set<Pago>();
            var pago = await set.FirstOrDefaultAsync(p => p.PreferenceId == preferenceId);
            return pago;
        }

        public async Task<Pago?> ObtenerPorExternalRefAsync(string externalReference)
        {
            var set = Contexto.Set<Pago>();
            var pago = await set.FirstOrDefaultAsync(p => p.ExternalReference == externalReference);
            return pago;
        }

        public async Task AgregarAsync(Pago pago)
        {
            var set = Contexto.Set<Pago>();
            await set.AddAsync(pago);
            // No guardo acá: que guarde el servicio con GuardarCambiosAsync()
        }

        public Task ActualizarAsync(Pago pago)
        {
            var set = Contexto.Set<Pago>();
            set.Update(pago);
            // No guardo acá: que guarde el servicio con GuardarCambiosAsync()
            return Task.CompletedTask;
        }

        public Task GuardarCambiosAsync()
        {
            return Contexto.SaveChangesAsync();
        }


    }
}
