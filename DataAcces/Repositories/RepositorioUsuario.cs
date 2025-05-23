using DataAcces.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcces.Repositories
{
    public class RepositorioUsuario:IRepositorioUsuario
    {
        public DbContext Contexto { get; set; }
        public RepositorioUsuario(DbContext contexto)
        {
            Contexto = contexto;
        }
    }
}
