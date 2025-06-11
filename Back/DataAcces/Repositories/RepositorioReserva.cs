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

       
        public IEnumerable<Reserva> ObtenerTodos()
        {
            return Contexto.Set<Reserva>().AsNoTracking().Select(c => c);
        }

        public Reserva? BuscarPorId(int id)
        {
            return Contexto.Set<Reserva>().FirstOrDefault(t => t.Id == id);
        }

        public IEnumerable<Reserva> BuscarPorFecha(DateTime fecha)
        {
            return Contexto.Set<Reserva>().Where(c => c.Fecha.Date == fecha.Date).ToList();
        }
        public IEnumerable<Reserva> BuscarPorNombreCliente(string nombre)
        {
          //  return Contexto.Set<Reserva>().Where(c => c.ObtenerNombreCliente() == nombre).AsNoTracking().ToList();

            return Contexto.Set<Reserva>().AsNoTracking().AsEnumerable().Where(c => c.ObtenerNombreCliente() == nombre).ToList();
        }

        public IEnumerable<Reserva> BuscarPorNombreServicio(string nombre)
        {
            return Contexto.Set<Reserva>().Where(r => r.Servicios.Any(s => s.Nombre == nombre)).Include(r => r.Servicios).AsNoTracking().ToList();
        }
    }
}
