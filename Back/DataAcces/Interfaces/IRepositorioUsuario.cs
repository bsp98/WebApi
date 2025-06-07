using DataAcces.Interfaces.CRUD;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Interfaces
{
    public interface IRepositorioUsuario:IRepositoryAdd<Usuario>, IRepositoryRemove<Usuario>, IRepositoryUpdate<Usuario>
    {
        Usuario? BuscarPorId(int id);
        IEnumerable<Usuario> ObtenerTodos();
        bool ExisteEmail(string email);

        public IEnumerable<Usuario> BuscarPorFecha(DateTime fecha);
        public IEnumerable<Usuario> BuscarPorNombre(string nombre);
        bool TieneReservas(int id);
    }
}

