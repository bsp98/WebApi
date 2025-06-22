using AutoMapper;
using DataAcces.Interfaces;
using Domain.Dto;
using Domain.Dto.FiltrosDto;
using Domain.Exceptions;
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
        private readonly IRepositorioAgenda _repositorioAgenda;
        private readonly IMapper _mapper;

        public ServicioReserva(IRepositorioReserva repositorioReserva, IRepositorioAgenda repositorioAgenda,IMapper mapper)
        {
            _repositorioReserva = repositorioReserva;
            _repositorioAgenda = repositorioAgenda;
            _mapper = mapper;
        }





        public ReservaDto Add(ReservaDto dto)
        {
            bool agendaCreada = false;
            if (_repositorioReserva.GetById(dto.Id) != null)
                throw new ExisteException("Ya existe una reserva con ese id");

            dto.Validar();

            // Validar conflictos de horario
            IEnumerable<Reserva> reservasDelDia = _repositorioReserva.BuscarPorFecha(dto.Fecha.Date);
            if (reservasDelDia.Any())
            {

                foreach (Reserva reserva in reservasDelDia)
                {
                    bool seSuperpone = dto.HoraInicio < reserva.HoraFin && dto.HoraFin > reserva.HoraInicio;
                    if (seSuperpone)
                        throw new ExisteException("El horario solicitado ya está reservado.");
                }
                Agenda agenda = _repositorioAgenda.BuscarPorFecha(dto.Fecha);
            }
            else 
            {
                agendaCreada = true;
               
            }

            Reserva nuevaReserva = _mapper.Map<Reserva>(dto);
            Reserva r = _repositorioReserva.Add(nuevaReserva);

            if (agendaCreada)
            {
                Agenda agenda = new Agenda(); 
                _repositorioAgenda.Add(agenda);
            }
               //BloqueHorario bloque = agenda.ObtenerBloqueHorario(dto.HoraInicio, dto.HoraFin);
                //bloque.EstaDisponible = false;
            
            return _mapper.Map<ReservaDto>(r);

          
        }


        public ReservaDto? GetById(int id)
        {
            Reserva r = _repositorioReserva.GetById(id);

            if (r == null)
            {
                throw new NoExisteException("No se encontro una reserva con ese Id");
            }
            return _mapper.Map<ReservaDto>(r);
        }

        public List<ReservaDto> GetAll()
        {
            IEnumerable<Reserva> r = _repositorioReserva.GetAll();
            return _mapper.Map<List<ReservaDto>>(r);
        }

        public void Remove(int id)
        {
            Reserva r = _repositorioReserva.GetById(id);

            if (r == null) throw new NoExisteException("No se encontro una reserva con ese id");

            _repositorioReserva.Remove(r);
        }

        public void Update(int id, ReservaDto dto)
        {
            Reserva r = _repositorioReserva.GetById(id);

            if (r == null) throw new NoExisteException("No se encontro una reserva con ese id");

            dto.Validar();
           
          r.Fecha=dto.Fecha;
            r.Cancelada=dto.Cancelada;

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
                reserva = GetAll();
            }

            return reserva;
        }

        public List<BloqueHorarioDto> ObtenerBloquesInicioDisponibles(DateTime fecha, int duracionMinutos)
        {
            // fijrse si hay agenda creada si - la busca y muestra los dias sino la busco los bloques con el metodo static
            if (fecha.DayOfWeek == DayOfWeek.Sunday)throw new NoExisteException("El domingo no se trabjaaaaaaaaaaaaaaaaaaaaaa");
            
            if (duracionMinutos <= 0) throw new DatoIncorrectoException("La duración debe ser mayor a 0.");

           // Agenda agenda = new Agenda(fecha);
           //agenda.MarcarReservados(reservas);
            Agenda agenda = _repositorioAgenda.BuscarPorFecha(fecha);
            List<BloqueHorario> bloquesDisponibles = null;
            if (agenda != null)
            {
             bloquesDisponibles = Agenda.ObtenerBloquesInicioDisponibles(duracionMinutos,agenda.Bloques);
            }
            else
            {

            List<BloqueHorario> bloquesDelDia = Agenda.GenerarBloquesPorDia();
            bloquesDisponibles = Agenda.ObtenerBloquesInicioDisponibles(duracionMinutos,bloquesDelDia);
            }

            return bloquesDisponibles.Select(b => new BloqueHorarioDto
            {
                HoraInicio = b.HoraInicio.ToString(@"hh\:mm"),
                HoraFin = b.HoraFin.ToString(@"hh\:mm")
            }).ToList();
        }


        private List<ReservaDto> BuscarPorNombreCliente(string cliente) => MapearReservas(_repositorioReserva.BuscarPorNombreCliente(cliente));

        private List<ReservaDto> BuscarPorNombreSrvicio(string service) => MapearReservas(_repositorioReserva.BuscarPorNombreServicio(service));

        private List<ReservaDto> BuscarPorFecha(DateTime fecha) => MapearReservas(_repositorioReserva.BuscarPorFecha(fecha));


        private List<ReservaDto> MapearReservas(IEnumerable<Reserva> reserva) => _mapper.Map<List<ReservaDto>>(reserva);

     
    }
}
