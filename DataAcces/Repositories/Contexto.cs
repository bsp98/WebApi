using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcces.Repositories
{
    public class Contexto:DbContext
    {
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Egreso> Egresos { get; set; }
        public DbSet<Pago> Pagos { get; set; }
        public DbSet<Publicacion> Publicaciones { get; set; }
        public DbSet<Reserva> Reservas { get; set; }
        public DbSet<Servicio> Servicios { get; set; }
        public Contexto(DbContextOptions options) : base(options)
        {

        }
    }
}
