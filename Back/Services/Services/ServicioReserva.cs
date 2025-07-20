using AutoMapper;
using DataAcces.Interfaces;
using DataAcces.Repositories;
using DataAccess.Interfaces;
using Domain.Dto;
using Domain.Dto.FiltrosDto;
using Domain.Enum;
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
        private readonly IRepositorioUsuario _repositorioUsuario;
        private readonly IRepositorioServicio _repositorioServicio;
        private readonly IServicioEmail _servicioEmail;
        private readonly IMapper _mapper;

        public ServicioReserva(IRepositorioReserva repositorioReserva, IRepositorioAgenda repositorioAgenda, IRepositorioBloqueHorario repositorioBloqueHorario, IRepositorioDiaNoLaborable repositorioDiaNoLaborable, IRepositorioUsuario repositorioUsuario, IRepositorioServicio repositorioServicio, IServicioEmail servicioEmail, IMapper mapper)
        {
            _repositorioReserva = repositorioReserva;
            _repositorioAgenda = repositorioAgenda;
            _repositorioBloqueHorario = repositorioBloqueHorario;
            _repositorioDiaNoLaborable = repositorioDiaNoLaborable;
            _repositorioUsuario = repositorioUsuario;
            _repositorioServicio = repositorioServicio;
            _servicioEmail=servicioEmail;
            _mapper = mapper;
        }





        public ReservaDto Add(CrearReservaDto dto)
        {
            //Valido el DTO
            dto.Validar();

            Usuario usu = _repositorioUsuario.GetById(dto.ClienteId.Value);
            if (usu != null && usu is Cliente)
            {
                if (dto.Fecha <= DateTime.Now) throw new DatoIncorrectoException("La fecha debe ser una fecha posterior a la actual");
            }
            //Busco el servicio.
            Servicio servicio = _repositorioServicio.GetById(dto.ServicioId);
            if (servicio == null) throw new NoExisteException("Servicio no encontrado");

            //Busco si existe una agenda para ese dia, sino la busco.
            Agenda agenda = _repositorioAgenda.BuscarPorFecha(dto.Fecha);

            // Me fijo si horario seleccionado esta reservado
            if (agenda != null)
            {
                if (!agenda.EstaDisponible(dto.HoraInicio, dto.HoraInicio.Add(TimeSpan.FromMinutes(servicio.TiempoDeDuracionMin)))) throw new ExisteException("El horario esta reservado");
            }
            else
            {
                agenda = new Agenda(dto.Fecha);
                _repositorioAgenda.Add(agenda);
            }

            Reserva reserva;
            Reserva r;
            //Si el Id del cliente viene con datos lo busco.
            if (dto.ClienteId.HasValue)
            {
                
                if (usu == null) throw new NoExisteException("Cliente no encontrado");
                if (usu is not Cliente cliente)
                    throw new Exception("El usuario no es un cliente");
                //Creo la reserva con el constructor con clienteId
                

                reserva = new Reserva(dto.Fecha,dto.HoraInicio, cliente, servicio);
              

                //Hago el add en el repo de reserva antes de agregarla a la lista de reservas del cliente
                r = _repositorioReserva.Add(reserva);
                if (cliente.Reservas == null)
                {
                    cliente.Reservas = new List<Reserva>();
                }
                cliente.Reservas.Add(reserva);
                _repositorioUsuario.Update(cliente);
            }
            else
            {
                //Creo la reserva con el constructor sin clienteId
                reserva = new Reserva(dto.Fecha,dto.HoraInicio, dto.NombreCliente,dto.ApellidoCliente, dto.EmailCliente, dto.CelularCliente, servicio);
                
                //Hago el add en el repo de reserva 
                r = _repositorioReserva.Add(reserva);
            }


            //Obtengo los bloques a reservar y seteo EstaDisponible en false
            List<BloqueHorario> bloquesReservados = agenda.ObtenerBloquesAReservar(r);
            foreach (BloqueHorario bloque in bloquesReservados)
            {
                bloque.EstaDisponible = false;
                _repositorioBloqueHorario.Update(bloque);
            }

            var reservaCompleta = _repositorioReserva.GetById(reserva.Id);
            return _mapper.Map<ReservaDto>(reservaCompleta);
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
            List<BloqueHorario> bloques = agenda.ObtenerBloquesHorario(r.HoraInicio, r.HoraFin);


            foreach (BloqueHorario b in bloques)
            {
                b.EstaDisponible = true;
                _repositorioBloqueHorario.Update(b);
            }
            _repositorioReserva.Remove(r);


            if (r.ClienteId != null) {

                Usuario usu = _repositorioUsuario.GetById(r.ClienteId.Value);

                if (usu is Cliente cliente)
                {
                    if (cliente.Reservas != null)
                    {
                        cliente.Reservas.Remove(r);
                        _repositorioUsuario.Update(cliente);
                    }
                }

            }

        }

        public void Update(int id, ReservaDto dto)
        {
            Reserva r = _repositorioReserva.GetById(id);

            if (r == null) throw new NoExisteException("No se encontro una reserva con ese id");

            dto.Validar();

            r.Fecha = dto.Fecha;
            r.Cancelada = dto.Cancelada;

            _repositorioReserva.Update(r);
        }


        public void Reagendar(int id, DateTime nuevaFecha, TimeSpan nuevaHoraInicio)
        {
            Reserva reserva = _repositorioReserva.GetById(id);
            if (reserva == null)
                throw new NoExisteException("La reserva no existe");

            if (nuevaHoraInicio < TimeSpan.Zero || nuevaHoraInicio >= TimeSpan.FromHours(24))
                throw new DatoIncorrectoException("Hora de inicio no válida");

            DateTime fechaHoraReservaActual = reserva.Fecha.Date + reserva.HoraInicio;
            if (fechaHoraReservaActual <= DateTime.Now.AddHours(12))
                throw new DatoIncorrectoException("No se puede reagendar una reserva con menos de 12 horas de anticipación");

            TimeSpan duracion = TimeSpan.FromMinutes(reserva.Servicio.TiempoDeDuracionMin);
            TimeSpan nuevaHoraFin = nuevaHoraInicio + duracion;

            if (nuevaHoraFin > TimeSpan.FromHours(24))
                throw new DatoIncorrectoException("La nueva hora de fin supera el día");


            Agenda agendaVieja = _repositorioAgenda.BuscarPorFecha(reserva.Fecha);
            List<BloqueHorario> bloquesViejos = agendaVieja.ObtenerBloquesHorario(reserva.HoraInicio, reserva.HoraFin);
            foreach (BloqueHorario b in bloquesViejos)
            {
                b.EstaDisponible = true;
                _repositorioBloqueHorario.Update(b);
            }


            Agenda agendaNueva = _repositorioAgenda.BuscarPorFecha(nuevaFecha.Date);
            if (agendaNueva == null)
            {
                agendaNueva = new Agenda(nuevaFecha.Date);
                _repositorioAgenda.Add(agendaNueva);
            }

            if (!agendaNueva.EstaDisponible(nuevaHoraInicio, nuevaHoraFin))
                throw new ExisteException("Los nuevos bloques horarios ya están reservados");


            List<BloqueHorario> nuevosBloques = agendaNueva.ObtenerBloquesHorario(nuevaHoraInicio, nuevaHoraFin);
            foreach (BloqueHorario b in nuevosBloques)
            {
                b.EstaDisponible = false;
                _repositorioBloqueHorario.Update(b);
            }

            reserva.Fecha = nuevaFecha.Date;
            reserva.HoraInicio = nuevaHoraInicio;
            reserva.HoraFin = nuevaHoraFin;

            _repositorioReserva.Update(reserva);
        }



        public List<ReservaDto> FiltrarReservas(ReservaFiltroDto filtros)
        {

            List<ReservaDto> reserva = new List<ReservaDto>();


            if (filtros.Nombrecliente != null)
            {
                reserva = BuscarPorNombreCliente(filtros.Nombrecliente);
            }
            else if (filtros.Nombreservicio != null)
            {
                reserva = BuscarPorNombreSrvicio(filtros.Nombreservicio);
            }
            else if (filtros.Fecha.HasValue)
            {
                reserva = BuscarPorFecha((DateTime)filtros.Fecha);
            }
            else if (filtros.ClienteId != null)
            {
                reserva = BuscarPorClienteId((int)filtros.ClienteId);

            }

            return reserva;
        }

       

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

            //List<BloqueHorario> disponibles = Agenda.ObtenerBloquesInicioDisponibles(duracionMinutos, bloquesTotales);

            

            List<BloqueHorario> filtrados = FiltrarBloquesSinBaches(bloquesTotales, duracionMinutos);

            return filtrados.Select(b => new BloqueHorarioDto
            {
                HoraInicio = b.HoraInicio.ToString(@"hh\:mm"),
                HoraFin = b.HoraInicio.Add(TimeSpan.FromMinutes(duracionMinutos)).ToString(@"hh\:mm")
            }).ToList();
        }


        
        private List<BloqueHorario> FiltrarBloquesSinBaches(List<BloqueHorario> todos, int duracionMinutos)
        {
            int bloquesNecesarios = duracionMinutos / 10;
            var resultadoManana = new List<BloqueHorario>();
            var resultadoTarde = new List<BloqueHorario>();

            TimeSpan horaLimiteManana = new TimeSpan(13, 0, 0);

            var bloquesManana = todos.Where(b => b.HoraInicio < horaLimiteManana).ToList();
            var bloquesTarde = todos.Where(b => b.HoraInicio >= horaLimiteManana).ToList();

            var reservasManana = bloquesManana.Where(b => !b.EstaDisponible).OrderBy(b => b.HoraInicio).ToList();
            var reservasTarde = bloquesTarde.Where(b => !b.EstaDisponible).OrderBy(b => b.HoraInicio).ToList();

            bool diaLibre = !reservasManana.Any() && !reservasTarde.Any();

            if (diaLibre)
            {
                resultadoManana.AddRange(FiltrarSinBaches(bloquesManana, bloquesNecesarios));
                resultadoTarde.AddRange(FiltrarSinBaches(bloquesTarde, bloquesNecesarios));
            }
            else
            {
                if (!reservasManana.Any())
                    resultadoManana.AddRange(FiltrarSinBaches(bloquesManana, bloquesNecesarios));
                else
                {
                    foreach (var reserva in reservasManana)
                        resultadoManana.AddRange(BloquesAdyacentes(bloquesManana, reserva, bloquesNecesarios));
                }

                if (!reservasTarde.Any())
                    resultadoTarde.AddRange(FiltrarSinBaches(bloquesTarde, bloquesNecesarios));
                else
                {
                    foreach (var reserva in reservasTarde)
                        resultadoTarde.AddRange(BloquesAdyacentes(bloquesTarde, reserva, bloquesNecesarios));
                }
            }

            return resultadoManana.Concat(resultadoTarde).Distinct().ToList();
        }

        // Reutilizá tus helpers:
        private List<BloqueHorario> FiltrarSinBaches(List<BloqueHorario> bloques, int bloquesNecesarios)
        {
            var resultado = new List<BloqueHorario>();
            for (int i = 0; i <= bloques.Count - bloquesNecesarios; i++)
            {
                var subrango = bloques.Skip(i).Take(bloquesNecesarios).ToList();
                if (subrango.All(b => b.EstaDisponible))
                {
                    resultado.Add(subrango.First());
                    i += bloquesNecesarios - 1;
                }
            }
            return resultado;
        }

        private List<BloqueHorario> BloquesAdyacentes(List<BloqueHorario> bloques, BloqueHorario reserva, int bloquesNecesarios)
        {
            var lista = new List<BloqueHorario>();
            int idx = bloques.IndexOf(reserva);

            // Anterior
            int anteriorIdx = idx - bloquesNecesarios;
            if (anteriorIdx >= 0)
            {
                var anterior = bloques.Skip(anteriorIdx).Take(bloquesNecesarios).ToList();
                if (anterior.All(b => b.EstaDisponible))
                    lista.Add(anterior.First());
            }

            // Siguiente
            int siguienteIdx = idx + 1;
            if (siguienteIdx + bloquesNecesarios - 1 < bloques.Count)
            {
                var siguiente = bloques.Skip(siguienteIdx).Take(bloquesNecesarios).ToList();
                if (siguiente.All(b => b.EstaDisponible))
                    lista.Add(siguiente.First());
            }

            return lista;
        }

       public async Task CancelarReserva(int id)
        {
            Reserva reserva = _repositorioReserva.GetById(id);
            if (reserva == null) throw new NoExisteException("Reserva no existe");
            reserva.Cancelada = true;
            _repositorioReserva.Update(reserva);

            Agenda agenda = _repositorioAgenda.BuscarPorFecha(reserva.Fecha);
            List<BloqueHorario> bloques = agenda.ObtenerBloquesHorario(reserva.HoraInicio, reserva.HoraFin);


            foreach (BloqueHorario b in bloques)
            {
                b.EstaDisponible = true;
                _repositorioBloqueHorario.Update(b);
            }

            Usuario usu = _repositorioUsuario.GetById(reserva.ClienteId.Value);

            if (usu is Cliente cliente)
            {
                if (cliente.Reservas != null)
                {
                    cliente.Reservas.Remove(reserva);
                    _repositorioUsuario.Update(cliente);
                }
            }

        }



        public void ModificarEstadoDePago(int id, TiposDeEstado estado)
        {
            Reserva r = _repositorioReserva.GetById(id);
            if (r == null) throw new NoExisteException("La reserva no existe");
            r.EstadoDePago = estado;
            _repositorioReserva.Update(r);

             string asunto = "Cancelación de Reserva";
             string mensaje = $"La persona {usu.Nombre} {usu.Apellido} ha cancelado su reserva";
             string emailAdmin = "maigiordano28@gmail.com";
             await _servicioEmail.EnviarEmailAsync(emailAdmin, asunto, mensaje);

        }







        private List<ReservaDto> BuscarPorNombreCliente(string cliente) => MapearReservas(_repositorioReserva.BuscarPorNombreCliente(cliente));

        private List<ReservaDto> BuscarPorNombreSrvicio(string service) => MapearReservas(_repositorioReserva.BuscarPorNombreServicio(service));

        private List<ReservaDto> BuscarPorFecha(DateTime fecha) => MapearReservas(_repositorioReserva.BuscarPorFecha(fecha));

        private List<ReservaDto> BuscarPorClienteId(int clienteId) => MapearReservas(_repositorioReserva.BuscarPorClienteId(clienteId));


        private List<ReservaDto> MapearReservas(IEnumerable<Reserva> reserva) => _mapper.Map<List<ReservaDto>>(reserva);


    }
}
