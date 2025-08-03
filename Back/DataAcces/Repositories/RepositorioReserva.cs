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
         

            return Contexto.Set<Reserva>().Include(r => r.Cliente).Include(r => r.Servicio).AsNoTracking().Where(r => r.Fecha.Date == fecha.Date).ToList();
        }

        public IEnumerable<Reserva> BuscarPorNombreCliente(string nombre)
        {

            return Contexto.Set<Reserva>().Include(r => r.Cliente).Include(r => r.Servicio).AsNoTracking().Where(r => r.Cliente != null && r.Cliente.Nombre == nombre || r.NombreCliente == nombre).ToList();

        }

        public IEnumerable<Reserva> BuscarPorNombreServicio(string nombre)
        {
            return Contexto.Set<Reserva>().Include(r => r.Cliente).Include(r => r.Servicio).Where(r => r.Servicio != null && r.Servicio.Nombre == nombre).AsNoTracking().ToList();
            // return Contexto.Set<Reserva>().Include(r => r.Servicio).AsNoTracking().AsEnumerable().Where(c => c.ObtenerNombreServicio() == nombre).ToList();
        }

        public IEnumerable<Reserva> BuscarPorClienteId(int clienteId)
        {
            DateTime hoy = DateTime.Today;

            return Contexto.Set<Reserva>().Include(r => r.Cliente).Include(r => r.Servicio).AsNoTracking().Where(r => r.ClienteId == clienteId && r.Fecha >= hoy).ToList();
        }
    

        public Reserva GetById(int id)
        {
            return Contexto.Set<Reserva>().Include(r => r.Cliente).Include(r => r.Servicio).FirstOrDefault(r => r.Id == id);
        }

        public IEnumerable<Reserva> GetAll()
        {
            return Contexto.Set<Reserva>().Include(r => r.Cliente).Include(r => r.Servicio).AsNoTracking().ToList();
        }

        public IEnumerable<Reserva> GetPorMesYAnio(int mes, int anio)
        {
            return Contexto.Set<Reserva>().Include(r => r.Servicio).Where(r => r.Fecha.Month == mes && r.Fecha.Year == anio).ToList();
        }

        public IEnumerable<Reserva> GetPorAnio(int anio)
        {
            return Contexto.Set<Reserva>().Include(r => r.Servicio).Where(r => r.Fecha.Year == anio).ToList();
        }

    }
}
