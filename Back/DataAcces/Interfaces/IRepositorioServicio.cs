using DataAcces.Interfaces.CRUD;
using Domain.Enum;
using Domain.Models;


namespace DataAcces.Interfaces
{
    public interface IRepositorioServicio : IRepositoryAdd<Servicio>, IRepositoryUpdate<Servicio>, IRepositoryRemove<Servicio>, IRepositoryGetAll<Servicio>, IRepositoryGetById<Servicio>
    {
        IEnumerable<Servicio> ObtenerPorCategoria(CategoriaServicio categoria);
        Servicio BuscarPorNombre(string nombre);

    }
}
