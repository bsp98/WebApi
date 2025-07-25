using DataAcces.Interfaces.CRUD;
using Domain.Enum;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcces.Interfaces
{
    public interface IRepositorioEgreso: IRepositoryAdd<Egreso>, IRepositoryRemove<Egreso>, IRepositoryUpdate<Egreso>, IRepositoryGetAll<Egreso>, IRepositoryGetById<Egreso>
    {
         IEnumerable<Egreso> BuscarPorCategoriaEgreso(CategoriaEgreso categoria);
         IEnumerable<Egreso> BuscarPorFecha(DateTime fecha);

        IEnumerable<Egreso> ObtenerEgresosPaginados(int page, int pageSize);
        int ContarEgresos(); // para saber cuántas páginas hay en total
    }
}
