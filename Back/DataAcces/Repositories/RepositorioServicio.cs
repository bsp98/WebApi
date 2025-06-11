using Domain.Models;
using DataAcces.Interfaces;
using Microsoft.EntityFrameworkCore;
using Domain.Enum;

namespace DataAcces.Repositories
{
    public class RepositorioServicio :RepositorioGeneral<Servicio> ,IRepositorioServicio
    {

        public RepositorioServicio(DbContext contexto)
        {
            Contexto = contexto;
        }

        public IEnumerable<Servicio> ObtenerPorCategoria(CategoriaServicio categoria)
        {
            return Contexto.Set<Servicio>().AsNoTracking().Where(s => s.Categoria == categoria);
        }

        public Servicio? BuscarPorNombre(string nombre)
        {

            return Contexto.Set<Servicio>().FirstOrDefault(t => t.Nombre == nombre);
        }

    }      
}

