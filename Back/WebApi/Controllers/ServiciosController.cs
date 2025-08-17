using Domain.Dto;

using Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Domain.Exceptions;
using Services.Exceptions;
using Microsoft.AspNetCore.Http.HttpResults;
using Domain.Models;
using Domain.Enum;

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




        [Authorize(Roles = "Administrador")]
        [HttpPost("Agregar")]
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

        [Authorize(Roles = "Administrador")]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Put(int id, [FromBody] ServicioDto servicioDto)
        {
            try
            { 
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
            catch (ExisteException ee)
            {

                return Conflict(ee.Message);
            }

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


        //[Authorize(Roles = "Administrador")]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetById(int id)
        {
            try
            {
                ServicioDto servicio = _servicioServicio.GetById(id);
                return Ok(servicio);
            }
            catch (NoExisteException nee)
            {
                return NotFound(nee.Message);
            }

        }


        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetAll()
        {
            List<ServicioDto> serviciosDto = _servicioServicio.GetAll();
            return Ok(serviciosDto);
        }

        [HttpGet("categoria/{categoria}")]
        //[Authorize(Roles = "Administrador")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public IActionResult ObtenerPorCategoria(CategoriaServicio categoria)
        {
            try
            {
                List<ServicioDto> serviciosDto = _servicioServicio.ObtenerPorCategoria(categoria);
                return Ok(serviciosDto);
            }
            catch (DatoIncorrectoException die)
            {
                return UnprocessableEntity(die.Message);
            }

        }

        [Authorize(Roles = "Administrador")]
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
