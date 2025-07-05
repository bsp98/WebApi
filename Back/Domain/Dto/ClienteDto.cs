using Domain.Exceptions;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class ClienteDto:UsuarioDto
    {
      

        public DateTime FechaDeNacimiento { get; set; }
        public string Celular { get; set; }
        public List<Reserva>? Reservas { get; set; }
        public bool Activo { get; set; }

        public ClienteDto(string email, string password, string nombre, string apellido, string origenCreacion, DateTime fechaDeNacimiento,string celular,bool activo) : base(email, password, nombre, apellido,origenCreacion)
        {
            Email= email;
            Password= password;
            Nombre= nombre;
            Apellido= apellido;
            OrigenCreacion = origenCreacion;

            FechaDeNacimiento =fechaDeNacimiento;
            Celular=celular;
            Reservas=new List<Reserva>();
            Activo= activo;

        }

        public ClienteDto() { }


        public override void Validar()
        {
            base.Validar();
            ValidarFechaDeNacimiento();
            ValidarCelular();
        }

        public void ValidarCelular()
        {
            if (string.IsNullOrEmpty(Celular))
                throw new DatoIncorrectoException("El número de celular no puede estar vacío.");

            if (!Regex.IsMatch(Celular, @"^09\d{7}$"))
                throw new DatoIncorrectoException("El número de celular debe comenzar con 09 y tener 9 dígitos.");
        }


        public void ValidarFechaDeNacimiento()
        {
            if (FechaDeNacimiento == null)
                throw new DatoIncorrectoException("La fecha de nacimiento no puede ser nula.");

            if (FechaDeNacimiento >= DateTime.Now)
                throw new DatoIncorrectoException("La fecha de nacimiento debe ser anterior al día de hoy."

);
        }


    }
}
