using Domain.Models;
using DataAcces.Interfaces;
using Microsoft.EntityFrameworkCore;



namespace DataAcces.Repositories
{
    public class RepositorioDiaNoLaborable: RepositorioGeneral<DiaNoLaborable>, IRepositorioDiaNoLaborable
    {

        public RepositorioDiaNoLaborable(DbContext contexto)
        {
            Contexto = contexto;
        }

        public bool Existe(DateTime fecha)
        {
            List<DiaNoLaborable> diaNoLaborables = Contexto.Set<DiaNoLaborable>().Where(d=>d.Fecha.Date==fecha.Date).ToList();
            if (diaNoLaborables.Count == 0)
            {
                return false;
            }
            return true;

        }
        
    }
}
