using AutoMapper;
using DataAccess.Interfaces;
using Domain.Dto;
using Domain.Models;
using Services.Interfaces;
using Services.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class ServicioUsuario : IServicioUsuario
    {
        private readonly IRepositorioUsuario _repositorioUsuario;
        private readonly IMapper _mapper;


        public ServicioUsuario(IRepositorioUsuario repositorioUsuario, IMapper mapper)
        {
            _repositorioUsuario = repositorioUsuario;
            _mapper = mapper;
        }


        public UsuarioDto Add(UsuarioDto dto)
        {

            return dto switch
            {
                ClienteDto cliente => AgregarCliente(cliente),
                AdministradorDto admin => AgregarAdministrador(admin),
                _ => throw new ArgumentException("Tipo de usuario no reconocido.")
            };
          
        }

        public UsuarioDto AgregarAdministrador(AdministradorDto dto)
        {
            dto.Validar();
            var entidad = _mapper.Map<Administrador>(dto);
            var guardado = _repositorioUsuario.Add(entidad);
            return _mapper.Map<AdministradorDto>(guardado);
        }

        public UsuarioDto AgregarCliente(ClienteDto dto)
        {
            dto.Validar();
            var entidad = _mapper.Map<Cliente>(dto);
            var guardado = _repositorioUsuario.Add(entidad);
            return _mapper.Map<ClienteDto>(guardado);
        }

        public void Remove(int id)
        {

            Usuario usu = _repositorioUsuario.BuscarPorId(id);

            if (usu == null) throw new NoExisteException("No se encontro un cliente con ese id");

            _repositorioUsuario.Remove(usu);
        }

        public void Update(int id, UsuarioDto dto)
        {
            throw new NotImplementedException();
        }

        public UsuarioDto? BuscarPorId(int id)
        {
            Usuario usuario = _repositorioUsuario.BuscarPorId(id);

            if (usuario == null)
            {
                throw new NoExisteException("No se encontro un usuario con ese Id");
            }

            return _mapper.Map<UsuarioDto>(usuario);
        }

        public List<ClienteDto> ObtenerTodos()
        {
            IEnumerable<Usuario> usuarios = _repositorioUsuario.ObtenerTodos();
            IEnumerable<Cliente> clientes = usuarios.OfType<Cliente>();

            return _mapper.Map<List<ClienteDto>>(clientes);
        }

        public void DesactivarCliente(int id)
        {
            Usuario usuario = _repositorioUsuario.BuscarPorId(id);
            if (usuario == null) throw new NoExisteException("Usuario no existe");

            if (usuario is Cliente cliente)
            {
                cliente.Activo = false;
                _repositorioUsuario.Update(cliente);
            }
            else
            {
                throw new InvalidOperationException("El usuario no es un cliente");
            }
        }
    }
}
