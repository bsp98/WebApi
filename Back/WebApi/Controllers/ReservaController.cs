using Domain.Dto;
using Domain.Dto.FiltrosDto;
using Domain.Enum;
using Domain.Exceptions;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Exceptions;
using Services.Interfaces;
using Services.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservaController : Controller
    {
        private readonly IServicioReserva _servicioReserva;

        public ReservaController(IServicioReserva servicioReserva)
        {
            _servicioReserva = servicioReserva;
        }


        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetAll()
        {
            List<ReservaDto> r = _servicioReserva.GetAll();
            return Ok(r);
        }


        //[Authorize]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetById(int id)
        {
            try
            {
                ReservaDto reserva = _servicioReserva.GetById(id);
                return Ok(reserva);
            }
            catch (NoExisteException nee)
            {
                return NotFound(nee.Message);
            }

        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult Delete(int id)
        {
            try
            {
                _servicioReserva.Remove(id);

                return Ok("Reserva cancelada con exito");
            }
            catch (NoExisteException ene)
            {
                return NotFound(ene.Message);
            }
       
        }

        [HttpPatch("cancelar/{id}")]
        public async Task<IActionResult> Cancelar(int id)
        {
            try
            {
                await _servicioReserva.CancelarReserva(id); 

                return Ok("Cancelado con éxito");
            }
            catch (NoExisteException ne)
            {
                return NotFound(ne.Message);
            }
            catch (UsuarioNoCliente e)
            {
                return UnprocessableEntity(e.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost()]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public IActionResult Post([FromBody] CrearReservaDto reservaDto)
        {
            try
            {
                ReservaDto r = _servicioReserva.Add(reservaDto);

                return Ok(r);

            } 
            catch (ExisteException eee)
            {
                return Conflict(eee.Message);
            }
            catch (FechaInvalidaException fie)
            {
                return Conflict(fie.Message);
            }
            catch (NoExisteException nee)
            {
                return NotFound(nee.Message);
            }
            catch (DatoIncorrectoException die)
            {
                return UnprocessableEntity(die.Message);
            }

        }

        [AllowAnonymous]
         [HttpPut("{id}")]
         [ProducesResponseType(StatusCodes.Status200OK)]
         [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
         [ProducesResponseType(StatusCodes.Status404NotFound)]
         public IActionResult Put(int id, [FromBody] ReservaDto reservaDto)
         {
             try
             {

                 _servicioReserva.Update(id, reservaDto);

                 return Ok("Modificado con exito");
             }
             catch (DatoIncorrectoException die)
             {
                 return UnprocessableEntity(die.Message);
             }
             catch (NoExisteException ene)
             {
                 return NotFound(ene.Message);
             }

         }
        

        [AllowAnonymous]
        [HttpPatch("{id}/fechahora")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult Reagendar(int id, [FromBody] ReservaFechaHoraDto dto)
        {
            try
            {
                _servicioReserva.Reagendar(id, dto.Fecha, dto.HoraInicio);
                return Ok("Fecha y hora modificadas con éxito");
            }
            catch (DatoIncorrectoException die)
            {
                return UnprocessableEntity(die.Message);
            }
            catch (NoExisteException ene)
            {
                return NotFound(ene.Message);
            }
            catch (ExisteException ee)
            {
                return Conflict(ee.Message);
            }
        }



        [AllowAnonymous]
        [HttpPatch("{id}/EstadoDePago")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ModificarEstadoDePago(int id, [FromBody] EstadoDePagoDto dto)
        {
            try
            {
                _servicioReserva.ModificarEstadoDePago(id, dto.EstadoDePago);
                return Ok("Estado de pago modificadas con éxito");
            }
            catch (NoExisteException ene)
            {
                return NotFound(ene.Message);
            }
        }



        [AllowAnonymous]
        [HttpGet("Filtrar")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetReservasPorFiltro([FromQuery] ReservaFiltroDto filtros)
        {


            List<ReservaDto> reservasDto = _servicioReserva.FiltrarReservas(filtros);

            return Ok(reservasDto);

        }


        [HttpGet("bloques-disponibles")]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult GetBloquesDisponibles([FromQuery] DateTime fecha, [FromQuery] int duracionMinutos)
        {
            try
            {
                List<BloqueHorarioDto> bloques = _servicioReserva.ObtenerBloquesInicioDisponibles(fecha, duracionMinutos);

                return Ok(bloques); // Devuelve lista de BloqueHorarioDTO
            }
            catch (NoExisteException ene)
            {
                return NotFound(ene.Message);
            }
            catch (DatoIncorrectoException ene) { 
                return UnprocessableEntity(ene.Message);
            }
            catch(ExisteException ene) { 
                return Conflict(ene.Message);
            }
        }


       

    }
}
