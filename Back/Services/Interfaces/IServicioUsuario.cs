using Domain.Dto;
using Domain.Dto.FiltrosDto;
using Services.Interfaces.CRUD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IServicioUsuario:IServicioAdd<UsuarioDto>,IServicioRemove<UsuarioDto>,IServicioUpdate<UsuarioDto>, IServicioGetById<UsuarioDto>
    {
        public List<ClienteDto> ObtenerTodos();

        void DesactivarCliente(int id);
        
        List<ClienteDto> FiltrarClientes(ClienteFiltrosDto filtros);

        public (List<ClienteDto> clientes, int total) ObtenerClientesPaginados(int page, int pageSize);

        public UsuarioDto ObtenerPorEmail(string email);

        void CambiarPassword(string email, string nuevaPassword);
        Task EnviarCodigoRecuperacionAsync(string email);
        void ConfirmarRecuperacionContrasenia(string email, string codigo, string nuevaPassword);
        public void CambiarPasswordPerfil(string email, string passwordActual, string nuevaPassword);
        


    }
}
