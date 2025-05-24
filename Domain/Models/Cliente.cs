using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Cliente : Usuario
    {
        public DateTime FechaDeNacimiento { get; set; }
        public int Celular { get; set; }
        public List<Reserva> Reservas { get; set; } = new List<Reserva>();

        public Cliente(string email, string password, string nombre, string apellido, DateTime fechaDeNacimiento, int celular) : base(email, password, nombre, apellido)
        {
            Email= email;
            Password= password;
            Nombre= nombre;
            Apellido= apellido;
            FechaDeNacimiento=fechaDeNacimiento;
            Celular=celular;
            Reservas=new List<Reserva>();

        }
        public Cliente() { }



        public override void Validar()
        {
            base.Validar();
        }



    }
}
