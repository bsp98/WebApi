using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Cliente : Usuario
    {
        public DateTime FechaDeNacimiento { get; set; }
        public  string Celular { get; set; }
        public List<Reserva> Reservas { get; set; } = new List<Reserva>();
        public bool Activo { get; set; }

        public Cliente(string email, string password, string nombre, string apellido, DateTime fechaDeNacimiento, string celular,bool activo) : base(email, password, nombre, apellido)
        {
            Email= email;
            Password= password;
            Nombre= nombre;
            Apellido= apellido;
            
            FechaDeNacimiento=fechaDeNacimiento;
            Celular=celular;
            Reservas=new List<Reserva>();
            Activo=activo;

        }
        public Cliente() { }

       
    }
}
