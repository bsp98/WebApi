using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class ClienteDto:UsuarioDto
    {
      

        public DateTime FechaDeNacimiento { get; set; }
        public int Celular { get; set; }
        public List<Reserva> Reservas { get; set; }
        public bool Activo { get; set; }

        public ClienteDto(string email, string password, string nombre, string apellido,DateTime fechaDeNacimiento,int celular,bool activo) : base(email, password, nombre, apellido)
        {
            Email= email;
            Password= password;
            Nombre= nombre;
            Apellido= apellido;
           
            FechaDeNacimiento=fechaDeNacimiento;
            Celular=celular;
            Reservas=new List<Reserva>();
            Activo= activo;

        }

        public ClienteDto() { }


        public override void Validar()
        {
            base.Validar();
        }



    }
}
