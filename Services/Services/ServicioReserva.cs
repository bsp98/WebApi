using AutoMapper;
using DataAcces.Interfaces;
using Domain.Dto;
using Domain.Models;
using Services.Exceptions;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class ServicioReserva : IServicioReserva
    {
        private readonly IRepositorioReserva _repositorioReserva;
        private readonly IMapper _mapper;

        public ServicioReserva(IRepositorioReserva repositorioReserva, IMapper mapper)
        {
            _repositorioReserva = repositorioReserva;
            _mapper = mapper;
        }

        public ReservaDto Add(ReservaDto dto)
        {
            if (_repositorioReserva.BuscarPorId(dto.Id) != null)
            {
                throw new ExisteException("Ya existe una reserva con ese id");
            }//????

            dto.Validar();

            Reserva nuevor = _mapper.Map<Reserva>(dto);
            Reserva r = _repositorioReserva.Add(nuevor);

            return _mapper.Map<ReservaDto>(r);
        }

        public ReservaDto? BuscarPorId(int id)
        {
            Reserva r = _repositorioReserva.BuscarPorId(id);

            if (r == null)
            {
                throw new NoExisteException("No se encontro una reserva con ese Id");
            }
            return _mapper.Map<ReservaDto>(r);
        }

        public List<ReservaDto> ObtenerTodos()
        {
            IEnumerable<Reserva> r = _repositorioReserva.ObtenerTodos();
            return _mapper.Map<List<ReservaDto>>(r);
        }

        public void Remove(int id)
        {
            Reserva r = _repositorioReserva.BuscarPorId(id);

            if (r == null) throw new NoExisteException("No se encontro una reserva con ese id");

            _repositorioReserva.Remove(r);
        }

        public void Update(int id, ReservaDto dto)
        {
            Reserva r = _repositorioReserva.BuscarPorId(id);

            if (r == null) throw new NoExisteException("No se encontro una reserva con ese id");

            dto.Validar();
           
            r.Nombre = dto.Nombre;
            r.Descripcion = dto.Descripcion;
            r.Precio=dto.Precio;//Calcularprecio;
            r.Disponibilidad=dto.Disponibilidad;//depende esto

            _repositorioReserva.Update(r);
        }
    }
}
