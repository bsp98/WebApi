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
    public class RepositorioAgenda: RepositorioGeneral<Agenda>, IRepositorioAgenda
    {
        public RepositorioAgenda(DbContext contexto)
        {
            Contexto = contexto;
        }
        public Agenda BuscarPorFecha(DateTime fecha)
        {
            return Contexto.Set<Agenda>().FirstOrDefault(c => c.Fecha.Date == fecha.Date);
        }
    }
}
