using DataAcces.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAcces.Repositories
{
    public class RepositorioModoDePago : RepositorioGeneral<ModoDePago>, IRepositorioModoDePago
    {
        public RepositorioModoDePago(DbContext contexto)
        {
            Contexto = contexto;
        }

        
    }
}
