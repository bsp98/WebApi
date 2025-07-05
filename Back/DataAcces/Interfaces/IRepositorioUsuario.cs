using DataAcces.Interfaces.CRUD;
using Domain.Dto;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Interfaces
{
    public interface IRepositorioUsuario:IRepositoryAdd<Usuario>, IRepositoryRemove<Usuario>, IRepositoryUpdate<Usuario>,IRepositoryGetAll<Usuario>, IRepositoryGetById<Usuario>
    {

        bool ExisteEmail(string email);
        public IEnumerable<Usuario> BuscarPorFecha(DateTime fecha);
        public IEnumerable<Usuario> BuscarPorNombre(string nombre);
        public IEnumerable<Usuario> BuscarPorNombreApellido(string nombre, string apellido);
        bool TieneReservas(int id);
        IEnumerable<Cliente> ObtenerClientesPaginados(int page, int pageSize);
        int ContarClientes(); // para saber cuántas páginas hay en total
    }
}

