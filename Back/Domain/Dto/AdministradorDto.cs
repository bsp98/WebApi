using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class AdministradorDto:UsuarioDto
    {


        public AdministradorDto() { }

        public AdministradorDto(string email, string password, string nombre, string apellido, string origenCreacion, TipoUsuario tipo) : base(email, password, nombre, apellido, origenCreacion, tipo)
        {
            Email=email;
            Password=password;
            Nombre=nombre;
            Tipo=tipo;
            Apellido=apellido;
            OrigenCreacion=origenCreacion;
        }

        public override void Validar()
        {
            base.Validar();
        }


    }
}
