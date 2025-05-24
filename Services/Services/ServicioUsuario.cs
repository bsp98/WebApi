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
            //Usuario entidad;
            //if (dto is ClienteDto cliente)
            //{
            //    entidad = _mapper.Map<Cliente>(cliente);
            //}
            //else if (dto is AdministradorDto empleado) { 
            //    entidad = _mapper.Map<Administrador>(empleado);
            //}
            dto.Validar();

            Usuario usuarioNuevo = _mapper.Map<Usuario>(dto);

            Usuario usuario = _repositorioUsuario.Add(usuarioNuevo);

            return _mapper.Map<UsuarioDto>(usuario);
        }

        public void Remove(int id)
        {
            throw new NotImplementedException();
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


    }
}
