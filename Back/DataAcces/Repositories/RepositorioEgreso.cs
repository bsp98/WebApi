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
        public IEnumerable<Egreso> FiltrarEgresos(CategoriaEgreso? categoria, DateTime? fecha)
        {
            var query = Contexto.Set<Egreso>().AsNoTracking().AsQueryable();

            if (categoria.HasValue)
            {
                query = query.Where(e => e.CategoriaEgreso == categoria.Value);
            }

            if (fecha.HasValue)
            {
                query = query.Where(e => e.Fecha.Date == fecha.Value.Date);
            }

            return query.ToList();
        }

        public IEnumerable<Egreso> ObtenerEgresosPaginados(int page, int pageSize)
        {
            return Contexto.Set<Egreso>().AsNoTracking().OrderByDescending(c => c.Fecha).Skip((page - 1) * pageSize).Take(pageSize).ToList();
        }

        public int ContarEgresos()
        {
            return Contexto.Set<Egreso>().Count();
        }


        public IEnumerable<Egreso> GetPorMesYAnio(int mes, int anio)
        {
            return Contexto.Set<Egreso>().Where(e => e.Fecha.Month == mes && e.Fecha.Year == anio).ToList();
        }
        public IEnumerable<Egreso> GetPorAnio(int anio)
        {
            return Contexto.Set<Egreso>().Where(e => e.Fecha.Year == anio).ToList();
        }
    }


}
