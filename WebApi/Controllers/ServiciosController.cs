using Domain.Dto;

using Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Domain.Exceptions;
using Services.Exceptions;
using Microsoft.AspNetCore.Http.HttpResults;
using Domain.Models;

namespace WebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ServicioController:Controller
    {
        private readonly IServicioServicio _servicioServicio;

        public ServicioController(IServicioServicio servicioServicio)
        {
            _servicioServicio = servicioServicio;
        }



        
        ///[Authorize]
        [HttpPost("Agregar servicio")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public IActionResult Post([FromBody] ServicioDto servicioDto)
        {
            try
            {
                ServicioDto servicioIngresado = _servicioServicio.Add(servicioDto);

                return Ok(servicioIngresado);

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

        //[Authorize]
        [HttpPut("{id} Modificar servicio")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Put(int id, [FromBody] ServicioDto servicioDto)
        {
            try
            {
                //Se asignan los valores de descripcion para la validacion
               
                _servicioServicio.Update(id, servicioDto);

                return Ok("Modificado con exito");
            }
            catch (DatoIncorrectoException die)
            {
                return UnprocessableEntity(die.Message);
            }
            catch (NoExisteException nee)
            {
                return NotFound(nee.Message);
            }

        }

        //[Authorize]
        [HttpDelete("{id} Eliminar servicio")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult Delete(int id)
        {
            try
            {
                _servicioServicio.Remove(id);

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
        ///[Authorize]
        [HttpGet("Obtener todos")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult ObtenerTodos()
        {
            List<ServicioDto> tiposDto = _servicioServicio.ObtenerTodos();
            return Ok(tiposDto);
        }

        //[Authorize]
        [HttpPatch("{id} Deshabilitar/Habilitar servicio")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Patch(int id)
        {
            try
            {
                //Se asignan los valores de descripcion para la validacion

                _servicioServicio.DeshabilitarOHabilitar(id);

                return Ok("Modificado con exito");
            }
            catch (DatoIncorrectoException die)
            {
                return UnprocessableEntity(die.Message);
            }
            catch (NoExisteException nee)
            {
                return NotFound(nee.Message);
            }

        }

    }


}
