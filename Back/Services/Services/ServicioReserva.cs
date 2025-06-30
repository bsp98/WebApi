using AutoMapper;
using DataAcces.Interfaces;
using DataAccess.Interfaces;
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
        private readonly IRepositorioBloqueHorario _repositorioBloqueHorario;
        private readonly IRepositorioDiaNoLaborable _repositorioDiaNoLaborable;
        private readonly IMapper _mapper;

        public ServicioReserva(IRepositorioReserva repositorioReserva, IRepositorioAgenda repositorioAgenda,IRepositorioBloqueHorario repositorioBloqueHorario, IRepositorioDiaNoLaborable repositorioDiaNoLaborable,IMapper mapper)
        {
            _repositorioReserva = repositorioReserva;
            _repositorioAgenda = repositorioAgenda;
            _repositorioBloqueHorario=repositorioBloqueHorario;
            _repositorioDiaNoLaborable=repositorioDiaNoLaborable;
            _mapper = mapper;
        }





        public ReservaDto Add(ReservaDto dto)
        {
            bool agendaCreada = false;
       
            if (_repositorioReserva.GetById(dto.Id) != null)
                throw new ExisteException("Ya existe una reserva con ese id");

            dto.Validar();
            Agenda agenda = _repositorioAgenda.BuscarPorFecha(dto.Fecha);
            // Validar conflictos de horario
            if (agenda !=null)
            {
                if (!agenda.EstaDisponible(dto.HoraInicio, dto.HoraFin)) throw new ExisteException("El horario esta reservado");

            }
            else { 
               agenda = new Agenda(dto.Fecha); 
             _repositorioAgenda.Add(agenda);
            }
              
            Reserva nuevaReserva = _mapper.Map<Reserva>(dto);
            Reserva r = _repositorioReserva.Add(nuevaReserva);
            List<BloqueHorario> bloquesReservados = agenda.MarcarBloquesReservados(r);
            foreach (BloqueHorario bloque in bloquesReservados)
            {
                bloque.EstaDisponible = false;
                _repositorioBloqueHorario.Update(bloque);
            }
           
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


        //Por ahora esto es del admin
        public void Remove(int id)
        {
            Reserva r = _repositorioReserva.GetById(id);

            if (r == null) throw new NoExisteException("No se encontro una reserva con ese id");
            
            Agenda agenda = _repositorioAgenda.BuscarPorFecha(r.Fecha);
            List<BloqueHorario> bloques = agenda.ObtenerBloquesHorario(r.HoraInicio,r.HoraFin);


            foreach (BloqueHorario b in bloques) {
                b.EstaDisponible=true;
                _repositorioBloqueHorario.Update(b);
            }
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
            else if (filtros.ClienteId!=null) 
            { 
                reserva =BuscarPorClienteId((int)filtros.ClienteId);
            
            }
            else
            {
                reserva = GetAll();
            }

            return reserva;
        }

        /*public List<BloqueHorarioDto> ObtenerBloquesInicioDisponibles(DateTime fecha, int duracionMinutos)
        {
            if (_repositorioDiaNoLaborable.Existe(fecha))
            {
                throw new ExisteException("No se puede reservar en esta fecha");
            }

            // fijrse si hay agenda creada si - la busca y muestra los dias sino la busco los bloques con el metodo static
            if (fecha.DayOfWeek == DayOfWeek.Sunday)throw new NoExisteException("El domingo no se trabjaaaaaaaaaaaaaaaaaaaaaa");
            
            if (duracionMinutos <= 0) throw new DatoIncorrectoException("La duración debe ser mayor a 0.");
            
            Agenda agenda = _repositorioAgenda.BuscarPorFecha(fecha);
            List<BloqueHorario> bloquesTotales;
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

          
        }*/

        public List<BloqueHorarioDto> ObtenerBloquesInicioDisponibles(DateTime fecha, int duracionMinutos)
        {
            if (_repositorioDiaNoLaborable.Existe(fecha))
                throw new ExisteException("No se puede reservar en esta fecha");

            if (fecha.DayOfWeek == DayOfWeek.Sunday)
                throw new NoExisteException("El domingo no se trabaja");

            if (duracionMinutos <= 0)
                throw new DatoIncorrectoException("La duración debe ser mayor a 0.");

            Agenda agenda = _repositorioAgenda.BuscarPorFecha(fecha);
            List<BloqueHorario> bloquesTotales;
            List<BloqueHorario> bloquesDisponibles = null;

            if (agenda != null)
            {
                bloquesTotales = agenda.Bloques;
                bloquesDisponibles = Agenda.ObtenerBloquesInicioDisponibles(duracionMinutos, bloquesTotales);
            }
            else
            {
                bloquesTotales = Agenda.GenerarBloquesPorDia();
                bloquesDisponibles = Agenda.ObtenerBloquesInicioDisponibles(duracionMinutos, bloquesTotales);
            }

            List<BloqueHorario> disponibles = Agenda.ObtenerBloquesInicioDisponibles(duracionMinutos, bloquesTotales);

            List<BloqueHorario> filtrados = FiltrarBloquesSinBaches(disponibles, bloquesTotales, duracionMinutos);

            return filtrados.Select(b => new BloqueHorarioDto
            {
                HoraInicio = b.HoraInicio.ToString(@"hh\:mm"),
                HoraFin = b.HoraInicio.Add(TimeSpan.FromMinutes(duracionMinutos)).ToString(@"hh\:mm")
            }).ToList();
        }
        private List<BloqueHorario> FiltrarBloquesSinBaches(List<BloqueHorario> disponibles, List<BloqueHorario> todos, int duracionMinutos)
        {
            int bloquesNecesarios = duracionMinutos / 10;
            var resultado = new List<BloqueHorario>();

            foreach (var inicio in disponibles)
            {
                int index = todos.IndexOf(inicio);
                if (index < 0 || index + bloquesNecesarios > todos.Count)
                    continue;

                var rango = todos.Skip(index).Take(bloquesNecesarios).ToList();

                // Verificar que todos los bloques estén disponibles
                if (!rango.All(b => b.EstaDisponible))
                    continue;

                // Verificar que no quede bache antes
                int libresAntes = 0;
                for (int i = index - 1; i >= 0 && todos[i].EstaDisponible; i--)
                    libresAntes++;

                if (libresAntes > 0 && libresAntes < bloquesNecesarios)
                    continue; // dejaría un bache antes

                // Verificar que no quede bache después
                int libresDespues = 0;
                for (int i = index + bloquesNecesarios; i < todos.Count && todos[i].EstaDisponible; i++)
                    libresDespues++;

                if (libresDespues > 0 && libresDespues < bloquesNecesarios)
                    continue; // dejaría un bache después

                // Agregar el bloque de inicio como válido
                resultado.Add(inicio);

                // Saltear los siguientes bloques que ya están cubiertos por este
                // para evitar solapamientos (ej: evitar 09:00 y 09:10 si ambos cubren 60 min)
                // Esto hace que las opciones salten de 60 en 60
                index += bloquesNecesarios - 1;
            }

            return resultado;
        }

        public void CancelarReserva(int id)
        {
            Reserva reserva = _repositorioReserva.GetById(id);
            if (reserva == null) throw new NoExisteException("Reserva no existe");
            reserva.Cancelada = true;
            _repositorioReserva.Update(reserva);

            Agenda agenda = _repositorioAgenda.BuscarPorFecha(reserva.Fecha);
            List<BloqueHorario> bloques = agenda.ObtenerBloquesHorario(reserva.HoraInicio, reserva.HoraFin);
            

            foreach (BloqueHorario b in bloques)
            {
                b.EstaDisponible=true;
                _repositorioBloqueHorario.Update(b);
            }

        }







        private List<ReservaDto> BuscarPorNombreCliente(string cliente) => MapearReservas(_repositorioReserva.BuscarPorNombreCliente(cliente));

        private List<ReservaDto> BuscarPorNombreSrvicio(string service) => MapearReservas(_repositorioReserva.BuscarPorNombreServicio(service));

        private List<ReservaDto> BuscarPorFecha(DateTime fecha) => MapearReservas(_repositorioReserva.BuscarPorFecha(fecha));

        private List<ReservaDto> BuscarPorClienteId(int clienteId) => MapearReservas(_repositorioReserva.BuscarPorClienteId(clienteId));


        private List<ReservaDto> MapearReservas(IEnumerable<Reserva> reserva) => _mapper.Map<List<ReservaDto>>(reserva);

     
    }
}
