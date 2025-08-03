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
    public class RepositorioPublicacion : RepositorioGeneral<Publicacion>, IRepositorioPublicacion
    {
        public RepositorioPublicacion(DbContext contexto)
        {
            Contexto = contexto;
        }
        public async Task<Publicacion> ObtenerPorIdAsync(int id)
        {
            return await Contexto.Set<Publicacion>().FindAsync(id);
        }

        public async Task EliminarAsync(Publicacion publicacion)
        {
            Contexto.Set<Publicacion>().Remove(publicacion);
            await Contexto.SaveChangesAsync();
        }

        public async Task<List<Publicacion>> ObtenerTodasAsync()
        {
            return await Contexto.Set<Publicacion>().OrderByDescending(p => p.FechaPublicacion).ToListAsync();
        }

        public async Task AgregarAsync(Publicacion publicacion)
        {
            Contexto.Set<Publicacion>().Add(publicacion);
            await Contexto.SaveChangesAsync();
        }

    }
}
