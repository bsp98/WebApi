using Domain.Models;
using Microsoft.EntityFrameworkCore;


namespace DataAcces.Repositories
{
    public class Contexto : DbContext
    {
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Servicio> Servicios { get; set; }
        public DbSet<Egreso> Egresos { get; set; }
        //public DbSet<Pago> Pagos { get; set; }
        //public DbSet<Publicacion> Publicaciones { get; set; }
        public DbSet<Reserva> Reservas { get; set; }
        public DbSet<Agenda> Agenda { get; set; }
        public DbSet<BloqueHorario> BloqueHorario { get; set; }
        public DbSet<DiaNoLaborable> DiaNoLaborables { get; set; }
        public Contexto(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>()
                .HasDiscriminator<TipoUsuario>("TipoUsuario") // <- tu propiedad actual
                .HasValue<Cliente>(TipoUsuario.Cliente)
                .HasValue<Administrador>(TipoUsuario.Administrador);

            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<Usuario>().HasDiscriminator<string>("TipoUsuario").HasValue<Cliente>("Cliente").HasValue<Administrador>("Administrador");


            //modelBuilder.Entity<Usuario>().HasDiscriminator<TipoUsuario>("Tipo").HasValue<Cliente>(TipoUsuario.Cliente).HasValue<Administrador>(TipoUsuario.Administrador);



            base.OnModelCreating(modelBuilder);


        }
    }
}
