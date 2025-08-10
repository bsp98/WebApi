using DataAcces.Interfaces.CRUD;
using Domain.Enum;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcces.Interfaces
{
    public interface IRepositorioPublicacion: IRepositoryAdd<Publicacion>, IRepositoryRemove<Publicacion>,IRepositoryGetAll<Publicacion>, IRepositoryGetById<Publicacion>
    {
        Task<Publicacion> ObtenerPorIdAsync(int id);
        Task EliminarAsync(Publicacion publicacion);
        Task<List<Publicacion>> ObtenerTodasAsync();
        Task AgregarAsync(Publicacion publicacion);
        Task<List<Publicacion>> ObtenerPorAnioAsync(int? anio);
        IEnumerable<Publicacion> ObtenerPublicacionesPaginados(int page, int pageSize);
        int ContarPublicaciones(); // para saber cuántas páginas hay en total
        IEnumerable<Publicacion> ObtenerPorCategoria(CategoriaServicio categoria);

    }
}
