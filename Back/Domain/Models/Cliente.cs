using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Cliente : Usuario
    {
        public DateTime? FechaDeNacimiento { get; set; }
        public  string Celular { get; set; } = string.Empty;
        [JsonIgnore]
        public List<Reserva> Reservas { get; set; } = new List<Reserva>();
        public bool Activo { get; set; }

        public bool PoliticasAceptadas { get; set; }

        public DateTime? FechaAceptacion { get; set; }

        public Cliente(string email, string password, string nombre, string apellido, DateTime fechaDeNacimiento, string celular,bool activo,bool politicasAceptadas,DateTime fechaAceptacion,TipoUsuario tipoUsuario) : base(email, password, nombre, apellido,tipoUsuario)
        {
            Email= email;
            Password= password;
            Nombre= nombre;
            Apellido= apellido;
            FechaDeNacimiento=fechaDeNacimiento;
            Celular=celular;
            Activo=activo;
            PoliticasAceptadas = politicasAceptadas;
            FechaAceptacion = fechaAceptacion;
            TipoUsuario = tipoUsuario;
        }

        public Cliente(string email,string nombre, string apellido,TipoUsuario tipoUsuario) : base(email, nombre, apellido, tipoUsuario)
        {
            Email = email;
            Nombre = nombre;
            Apellido = apellido;
            Activo = true;
            TipoUsuario = tipoUsuario;
        }
        public Cliente() { }

       
    }
}
