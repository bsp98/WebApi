using Domain.Dto;
using Services.Interfaces.CRUD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IServicioUsuario:IServicioAdd<UsuarioDto>,IServicioRemove<UsuarioDto>,IServicioUpdate<UsuarioDto>
    {
        List<ClienteDto> ObtenerTodos();
        void DesactivarCliente(int id);
    }
}
