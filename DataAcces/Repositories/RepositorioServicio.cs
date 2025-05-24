using Domain.Models;
using DataAcces.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAcces.Repositories
{
    public class RepositorioServicio :RepositorioGeneral<Servicio> ,IRepositorioServicio
    {

        public RepositorioServicio(DbContext contexto)
        {
            Contexto = contexto;
        }

      
        public IEnumerable<Servicio> ObtenerTodos()
        {
            return Contexto.Set<Servicio>().AsNoTracking();
        }

    
    }      
}

