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
using Domain.Dto.FiltrosDto;

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
            if (_repositorioUsuario.ExisteEmail(dto.Email))
                throw new ExisteException("Ya existe un usuario con ese email.");

            var entidad = _mapper.Map<Cliente>(dto);
            var guardado = _repositorioUsuario.Add(entidad);
            return _mapper.Map<ClienteDto>(guardado);
        }

        public void Remove(int id)
        {

            Usuario usu = _repositorioUsuario.BuscarPorId(id);

            if (usu == null) throw new NoExisteException("No se encontro un cliente con ese id");

            if (usu is Cliente )
            { 
                if (_repositorioUsuario.TieneReservas(id))
                    throw new TieneReservas("No se puede eliminar el cliente porque tiene reservas asociadas.");
            }
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
                throw new UsuarioNoCliente("El usuario no es un cliente");
            }
        }

        public List<ClienteDto> FiltrarClientes(ClienteFiltrosDto filtros)
        {
            if (!string.IsNullOrWhiteSpace(filtros.Nombre))
            {
                var clientes = _repositorioUsuario.BuscarPorNombre(filtros.Nombre).OfType<Cliente>().ToList();

                return _mapper.Map<List<ClienteDto>>(clientes);
            }

            if (filtros.Fecha.HasValue)
            {
                var clientes = _repositorioUsuario.BuscarPorFecha(filtros.Fecha.Value).OfType<Cliente>().ToList();

                return _mapper.Map<List<ClienteDto>>(clientes);
            }

            return ObtenerTodos(); 
        }

        private List<ClienteDto> BuscarPorNombre(string nombre) => MapearClientes(_repositorioUsuario.BuscarPorNombre(nombre));

        private List<ClienteDto> BuscarPorFecha(DateTime fecha) => MapearClientes(_repositorioUsuario.BuscarPorFecha(fecha));

        private List<ClienteDto> MapearClientes(IEnumerable<Usuario> usuarios)
        {
            var clientes = usuarios.OfType<Cliente>().ToList();
            return _mapper.Map<List<ClienteDto>>(clientes);
        }

        public UsuarioDto? Login(string email, string password)
        {
            Usuario? usuario = _repositorioUsuario.Login(email, password);

            if (usuario == null)
            {
                throw new NoExisteException("Las Credenciales no son validas");
            }

            if (usuario is Administrador admin)
                return _mapper.Map<AdministradorDto>(admin);
            else if (usuario is Cliente cliente)
                return _mapper.Map<ClienteDto>(cliente);
            else
                throw new NoExisteException("Tipo de usuario desconocido");
        }

    }
}
