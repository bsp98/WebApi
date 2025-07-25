using DataAcces.Interfaces;
using Domain.Enum;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcces.Repositories
{
    public class RepositorioEgreso:RepositorioGeneral<Egreso>, IRepositorioEgreso
    {
        public RepositorioEgreso(DbContext contexto)
        {
            Contexto = contexto;
        }

        public IEnumerable<Egreso> BuscarPorFecha(DateTime fecha)
        {
            return Contexto.Set<Egreso>().AsNoTracking().Where(c => c.Fecha.Date == fecha.Date).ToList();
        }

        public IEnumerable<Egreso> BuscarPorCategoriaEgreso(CategoriaEgreso categoria)
        {
            return Contexto.Set<Egreso>().AsNoTracking().Where(s => s.CategoriaEgreso == categoria);
        }


        public IEnumerable<Egreso> ObtenerEgresosPaginados(int page, int pageSize)
        {
            return Contexto.Set<Egreso>().AsNoTracking().OrderBy(c => c.Fecha).Skip((page - 1) * pageSize).Take(pageSize).ToList();
        }

        public int ContarEgresos()
        {
            return Contexto.Set<Egreso>().Count();
        }

    }


}
