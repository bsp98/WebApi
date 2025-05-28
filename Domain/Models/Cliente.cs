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



        public override void Validar()
        {
            base.Validar();
            ValidarFechaDeNacimiento();
            ValidarCelular();
        }

        public void ValidarCelular()
        {
            if (string.IsNullOrEmpty(Celular))
                throw new ArgumentException("El número de celular no puede estar vacío.");

            if (!Regex.IsMatch(Celular, @"^09\d{7}$"))
                throw new ArgumentException("El número de celular debe comenzar con 09 y tener 9 dígitos.");
        }    
        

        public void ValidarFechaDeNacimiento()
        {
            var hoy = DateTime.Today;
            var edad = hoy.Year - FechaDeNacimiento.Year;

            if (FechaDeNacimiento > hoy.AddYears(-edad)) edad--;

            if (edad < 18)
                throw new ArgumentException("El cliente debe tener al menos 18 años.");
        }
    }
}
