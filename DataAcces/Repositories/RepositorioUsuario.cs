using DataAcces.Interfaces;
using DataAccess.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcces.Repositories
{
    public class RepositorioUsuario:RepositorioGeneral<Usuario>,IRepositorioUsuario
    {
        //public DbContext Contexto { get; set; }
        //public RepositorioUsuario(DbContext contexto)
        //{
        //    Contexto = contexto;
        //}
     

        public Usuario? BuscarPorId(int id)
        {
            return Contexto.Set<Usuario>().AsNoTracking().FirstOrDefault(m => m.Id == id);
        }
    }
}
