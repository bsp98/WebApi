using DataAcces.Interfaces;
using DataAccess.Interfaces;
using Domain.Dto;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DataAcces.Repositories
{
    public class RepositorioUsuario:RepositorioGeneral<Usuario>,IRepositorioUsuario
    {
        //public DbContext Contexto { get; set; }
        public RepositorioUsuario(DbContext contexto)
        {
            Contexto = contexto;
        }

        public bool ExisteEmail(string email)
        {
            return Contexto.Set<Usuario>().Any(u => u.Email == email);
        }
        public Usuario ObtenerPorEmail(string email)
        {
            return Contexto.Set<Usuario>().FirstOrDefault(u => u.Email == email);
        }
        //public async Task<Usuario> ObtenerPorEmailAsync(string email)
        //{
        //    return await Contexto.Set<Usuario>().FirstOrDefaultAsync(c => c.Email == email);

        //}
        public IEnumerable<Usuario> BuscarPorFecha(DateTime fecha)
        {
            return Contexto.Set<Usuario>() .OfType<Cliente>().AsNoTracking().Where(c => c.FechaDeNacimiento.Date == fecha.Date).ToList();
        }

        public IEnumerable<Usuario> BuscarPorNombre(string nombre)
        {
            return Contexto.Set<Usuario>() .Where(c => c.Nombre == nombre).AsNoTracking().ToList();
        }


        public IEnumerable<Usuario> BuscarCelular(string celular)
        {
            return Contexto.Set<Usuario>().OfType<Cliente>().Where(c=>c.Celular == celular).AsNoTracking().ToList();
        }

        public bool TieneReservas(int id)
        {
            return Contexto.Set<Reserva>().Any(r => r.Id == id);
        }

        public Usuario? Login(string email, string password)
        {
            return Contexto.Set<Usuario>().AsNoTracking().FirstOrDefault(u => u.Email == email && u.Password == password);
        }

        public IEnumerable<Cliente> ObtenerClientesPaginados(int page, int pageSize)
        {
            return Contexto.Set<Usuario>().OfType<Cliente>().AsNoTracking().OrderBy(c => c.Nombre).Skip((page - 1) * pageSize).Take(pageSize).ToList();
        }

        public int ContarClientes()
        {
            return Contexto.Set<Usuario>().OfType<Cliente>().Count();
        }
    }
}
