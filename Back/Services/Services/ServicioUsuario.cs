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
using Services.Interfaces.CRUD;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;

namespace Services.Services
{
    public class ServicioUsuario : IServicioUsuario
    {
        private readonly IRepositorioUsuario _repositorioUsuario;
        private readonly IServicioCodigo _servicioCodigo;
        private readonly IServicioEmail _servicioEmail;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
       

        public ServicioUsuario(IRepositorioUsuario repositorioUsuario, IMapper mapper, IServicioCodigo servicioCodigo, IServicioEmail servicioEmail, IConfiguration configuration)
        {
            _repositorioUsuario = repositorioUsuario;
            _mapper = mapper;
            _servicioCodigo=servicioCodigo;
            _servicioEmail=servicioEmail;
            _configuration = configuration;
        }


        public UsuarioDto Add(UsuarioDto dto)
        {

            if (dto is ClienteDto clienteDto)
            {
                return AgregarCliente(clienteDto);
            }

            if (dto is AdministradorDto adminDto)
            {
                return AgregarAdministrador(adminDto);
            }

            throw new NoExisteException("Tipo de usuario no reconocido.");

        }

        public UsuarioDto AgregarAdministrador(AdministradorDto dto)
        {
            dto.Validar();
            Administrador admin = _mapper.Map<Administrador>(dto);
            Usuario guardado = _repositorioUsuario.Add(admin);
            return _mapper.Map<AdministradorDto>(guardado);
        }

        public UsuarioDto AgregarCliente(ClienteDto dto)
        {
            dto.Validar();
            if (_repositorioUsuario.ExisteEmail(dto.Email)) throw new ExisteException("Ya existe un usuario con ese email.");

            Cliente cli = _mapper.Map<Cliente>(dto);
            Usuario guardado = _repositorioUsuario.Add(cli);
            return _mapper.Map<ClienteDto>(guardado);
        }

        public void Remove(int id)
        {

            Usuario usu = _repositorioUsuario.GetById(id);

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

        public List<ClienteDto> ObtenerTodos()
        {
            IEnumerable<Usuario> usuarios = _repositorioUsuario.GetAll();
            IEnumerable<Cliente> clientes = usuarios.OfType<Cliente>();

            return _mapper.Map<List<ClienteDto>>(clientes);
        }

        public void DesactivarCliente(int id)
        {
            Usuario usuario = _repositorioUsuario.GetById(id);
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
            /*if (!string.IsNullOrWhiteSpace(filtros.Nombre) && string.IsNullOrWhiteSpace(filtros.Celular))
            {
                var clientes = _repositorioUsuario.BuscarPorNombre(filtros.Nombre).OfType<Cliente>().ToList();

                return _mapper.Map<List<ClienteDto>>(clientes);
            }*/

            if (filtros.Fecha.HasValue)
            {
                var clientes = _repositorioUsuario.BuscarPorFecha(filtros.Fecha.Value).OfType<Cliente>().ToList();

                return _mapper.Map<List<ClienteDto>>(clientes);
            }

            if ( !string.IsNullOrWhiteSpace(filtros.Celular))
            {
                var clientes = _repositorioUsuario.BuscarCelular( filtros.Celular).OfType<Cliente>().ToList();

                return _mapper.Map<List<ClienteDto>>(clientes);
            }

            return new List<ClienteDto>(); 
        }

        public (List<ClienteDto> clientes, int total) ObtenerClientesPaginados(int page, int pageSize)
        {
            var clientes = _repositorioUsuario.ObtenerClientesPaginados(page, pageSize);
            var total = _repositorioUsuario.ContarClientes();

            return (_mapper.Map<List<ClienteDto>>(clientes), total);
        }

        private List<ClienteDto> MapearClientes(IEnumerable<Usuario> usuarios)
        {
            var clientes = usuarios.OfType<Cliente>().ToList();
            return _mapper.Map<List<ClienteDto>>(clientes);
        }


       public UsuarioDto ObtenerPorEmail(string email)
        {
            Usuario usuario = _repositorioUsuario.ObtenerPorEmail(email);

            if (usuario is Cliente cliente)
            {
                return _mapper.Map<ClienteDto>(cliente);
            }

            if (usuario is Administrador admin)
            {
                return _mapper.Map<AdministradorDto>(admin);
            }

            return null;
        }

        public UsuarioDto GetById(int id)
        {
           Usuario usuario = _repositorioUsuario.GetById(id);

            if (usuario == null) {
                throw new NoExisteException("No existe un usuario con ese id");
            }

            if (usuario is Cliente cliente) {
                return _mapper.Map<ClienteDto>(cliente);
            }

            if (usuario is Administrador admin) {
                return _mapper.Map<AdministradorDto>(admin);
            }

            throw new Exception("Tipo de usuario no reconocido");
        }


        public void CambiarPassword(string email, string nuevaPassword)
        {
            Usuario usuario = _repositorioUsuario.ObtenerPorEmail(email);
            if (usuario == null)
                throw new NoExisteException("No se encontró un usuario con ese email.");

            usuario.Password = nuevaPassword;
            _repositorioUsuario.Update(usuario); 
        }
        public void ConfirmarRecuperacionContrasenia(string email, string codigo, string nuevaPassword)
        {
            if (!_servicioCodigo.VerificarCodigo(email, codigo))
                throw new NoExisteException("Código inválido o expirado.");

            CambiarPassword(email, nuevaPassword);
            _servicioCodigo.EliminarCodigo(email);
        }

        public async Task EnviarCodigoRecuperacionAsync(string email)
        {
            Usuario usuario = _repositorioUsuario.ObtenerPorEmail(email);
            if (usuario == null)
                throw new NoExisteException("No se encontró usuario con ese email.");

            string codigo = new Random().Next(100000, 999999).ToString();
            _servicioCodigo.GuardarCodigo(email, codigo);

            string cuerpo = $"<p>Tu código de recuperación es: <strong>{codigo}</strong></p>";
            await _servicioEmail.EnviarEmailAsync(email, "Código de recuperación", cuerpo);
        }
    }
}
