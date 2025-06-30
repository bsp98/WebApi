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
    public class RepositorioBloqueHorario: RepositorioGeneral<BloqueHorario>, IRepositorioBloqueHorario
    {
        public RepositorioBloqueHorario(DbContext contexto)
        {
            Contexto = contexto;
        }
    }
}
