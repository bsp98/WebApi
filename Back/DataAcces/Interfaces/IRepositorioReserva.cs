using DataAcces.Interfaces.CRUD;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcces.Interfaces
{
    public interface IRepositorioReserva: IRepositoryAdd<Reserva>,IRepositoryRemove<Reserva>, IRepositoryUpdate<Reserva>
    {
        public IEnumerable<Reserva> BuscarPorFecha(DateTime fecha);
        public IEnumerable<Reserva> BuscarPorNombreCliente(string nombre);
        public IEnumerable<Reserva> BuscarPorNombreServicio(string nombre);
        public IEnumerable<Reserva> BuscarPorClienteId(int clienteId);
        public Reserva GetById(int id);
        public IEnumerable<Reserva> GetAll();
    }
}
 