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
    public class RepositorioPublicacion : RepositorioGeneral<Publicacion>, IRepositorioPublicacion
    {
        public RepositorioPublicacion(DbContext contexto)
        {
            Contexto = contexto;
        }


    }
}
