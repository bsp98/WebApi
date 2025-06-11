using AutoMapper;
using DataAcces.Interfaces;
using Domain.Dto;
using Domain.Dto.FiltrosDto;
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
           
          r.Fecha=dto.Fecha;
         //   r.Servicios=dto.Servicios;
            r.PrecioTotal=dto.PrecioTotal;//Calcularprecio;
       

            _repositorioReserva.Update(r);
        }

        public List<ReservaDto> FiltrarReservas(ReservaFiltroDto filtros)
        {

            List<ReservaDto> reserva = new List<ReservaDto>();

        
            if (filtros.Nombrecliente != null)
            {
                reserva = BuscarPorNombreCliente(filtros.Nombrecliente);
            }
            else if (filtros.Nombreservicio!= null)
            {
                reserva = BuscarPorNombreSrvicio(filtros.Nombreservicio);
            }
            else if (filtros.Fecha.HasValue)
            {
                reserva = BuscarPorFecha((DateTime)filtros.Fecha);
            }
            else
            {
                reserva = ObtenerTodos();
            }

            return reserva;
        }


        private List<ReservaDto> BuscarPorNombreCliente(string cliente) => MapearReservas(_repositorioReserva.BuscarPorNombreCliente(cliente));

        private List<ReservaDto> BuscarPorNombreSrvicio(string service) => MapearReservas(_repositorioReserva.BuscarPorNombreServicio(service));

        private List<ReservaDto> BuscarPorFecha(DateTime fecha) => MapearReservas(_repositorioReserva.BuscarPorFecha(fecha));


        private List<ReservaDto> MapearReservas(IEnumerable<Reserva> reserva) => _mapper.Map<List<ReservaDto>>(reserva);

    }
}
