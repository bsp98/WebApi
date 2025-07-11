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
    public class RepositorioReserva: RepositorioGeneral<Reserva>, IRepositorioReserva
    {

        public RepositorioReserva(DbContext contexto)
        {
            Contexto = contexto;
        }

        public IEnumerable<Reserva> BuscarPorFecha(DateTime fecha)
        {
            return Contexto.Set<Reserva>().Where(c => c.Fecha.Date == fecha.Date).ToList();
        }

        public IEnumerable<Reserva> BuscarPorNombreCliente(string nombre)
        {
          
                return Contexto.Set<Reserva>().Include(r => r.Cliente).AsNoTracking().AsEnumerable().Where(r => r.Cliente?.Nombre  == nombre || r.NombreCliente == nombre).ToList();
            
        }

        public IEnumerable<Reserva> BuscarPorNombreServicio(string nombre)
        {
            return Contexto.Set<Reserva>().Include(r => r.Servicio).AsNoTracking().AsEnumerable().Where(c => c.ObtenerNombreServicio() == nombre).ToList();
        }

        public IEnumerable<Reserva> BuscarPorClienteId(int clienteId)
        {
            return Contexto.Set<Reserva>().Include(r => r.Cliente).AsNoTracking().AsEnumerable().Where(c => c.ClienteId == clienteId).ToList();
        }

        public Reserva GetById(int id)
        {
            return Contexto.Set<Reserva>().Include(r => r.Cliente).Include(r => r.Servicio).FirstOrDefault(r => r.Id == id);
        }

        public IEnumerable<Reserva> GetAll()
        {
            return Contexto.Set<Reserva>().Include(r => r.Cliente).Include(r => r.Servicio).AsNoTracking().ToList();
        }
    }
}
