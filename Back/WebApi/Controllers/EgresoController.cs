using Domain.Dto;
using Domain.Dto.FiltrosDto;
using Domain.Enum;
using Domain.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Exceptions;
using Services.Interfaces;
using Services.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EgresoController : Controller
    {

        private readonly IServicioEgreso _servicioEgreso;

        public EgresoController(IServicioEgreso servicioEgreso)
        {
            _servicioEgreso=servicioEgreso;
        }


        [Authorize(Roles = "Administrador")]
        [HttpPost("Agregar")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public IActionResult Post([FromBody] EgresoDto egresoDto)
        {
            try
            {
                EgresoDto EgresoIngresado = _servicioEgreso.Add(egresoDto);

                return Ok("Egreso creado con exito");

            }
            catch (ExisteException ee)
            {

                return Conflict(ee.Message);
            }
            catch (DatoIncorrectoException die)
            {

                return UnprocessableEntity(die.Message);
            }

        }

        ////[Authorize]
        //[HttpPut("{id}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public IActionResult Put(int id, [FromBody] EgresoDto egresoDto)
        //{
        //    try
        //    {
        //        _servicioEgreso.Update(id, egresoDto);

        //        return Ok("Modificado con exito");
        //    }
        //    catch (DatoIncorrectoException die)
        //    {
        //        return UnprocessableEntity(die.Message);
        //    }
        //    catch (NoExisteException nee)
        //    {
        //        return NotFound(nee.Message);
        //    }
        //    catch (ExisteException ee)
        //    {

        //        return Conflict(ee.Message);
        //    }

        //}




        [Authorize(Roles = "Administrador")]
        [HttpGet("Filtrar")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetEgresosPorFiltro([FromQuery] EgresoFiltrosDto filtros)
        {


            List<EgresoDto> egresoDto = _servicioEgreso.FiltrarEgresos(filtros);

            return Ok(egresoDto);

        }


        [Authorize(Roles = "Administrador")]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult Delete(int id)
        {
            try
            {
                _servicioEgreso.Remove(id);

                return Ok("Eliminado con exito");
            }
            catch (NoExisteException nee)
            {
                return NotFound(nee.Message);
            }
            catch (EnUsoException tee)
            {
                return Conflict(tee.Message);
            }

        }



        [Authorize(Roles = "Administrador")]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetById(int id)
        {
            try
            {
                EgresoDto egreso = _servicioEgreso.GetById(id);
                return Ok(egreso);
            }
            catch (NoExisteException nee)
            {
                return NotFound(nee.Message);
            }

        }



        [Authorize(Roles = "Administrador")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetAll()
        {
            List<EgresoDto> egresosDto = _servicioEgreso.GetAll();
            return Ok(egresosDto);
        }

        [HttpGet("Paginado")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetEgresosPaginados([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var (egresos, total) = _servicioEgreso.ObtenerEgresosPaginados(page, pageSize);

                return Ok(new
                {
                    data = egresos,
                    totalItems = total
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor");
            }
        }


    }
}
