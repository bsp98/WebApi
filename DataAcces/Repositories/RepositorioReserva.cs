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
    }
}
