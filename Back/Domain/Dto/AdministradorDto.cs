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

        public AdministradorDto(string email, string password, string nombre, string apellido, string origenCreacion, TipoUsuario tipoUsuario) : base(email, password, nombre, apellido, origenCreacion)
        {
            Email=email;
            Password=password;
            Nombre=nombre;
            Apellido=apellido;
            OrigenCreacion=origenCreacion;
            TipoUsuario = TipoUsuario.Administrador;
        }

        public override void Validar()
        {
            base.Validar();
        }


    }
}
