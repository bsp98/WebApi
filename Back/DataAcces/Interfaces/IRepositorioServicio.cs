using DataAcces.Interfaces.CRUD;
using Domain.Models;


namespace DataAcces.Interfaces
{
    public interface IRepositorioServicio : IRepositoryAdd<Servicio>, IRepositoryUpdate<Servicio>, IRepositoryRemove<Servicio>
    {
        IEnumerable<Servicio> ObtenerTodos();
        Servicio? BuscarPorNombre(string nombre);
        Servicio? BuscarPorId(int id);


    }
}
