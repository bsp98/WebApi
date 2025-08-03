using Domain.Dto;
using Domain.Exceptions;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Exceptions;
using Services.Interfaces;

namespace WebApi.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class PublicacionController : Controller
    {
        private readonly IServicioPublicacion _servicioPublicacion;
        private readonly IWebHostEnvironment _env;

        public PublicacionController(IServicioPublicacion servicioPublicacion,IWebHostEnvironment env)
        {
            _servicioPublicacion=servicioPublicacion;
            _env = env;
        }



        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [HttpPost]
        public async Task<IActionResult> Crear([FromForm] CrearPublicacionDto dto)
        {
            try
            {
                var rutaWeb = "/imagenes/publicaciones";
                var rutaFisica = Path.Combine(_env.WebRootPath, "imagenes", "publicaciones");

                PublicacionDto publicacion = await _servicioPublicacion.CrearPublicacionAsync(dto, rutaWeb, rutaFisica);
                return Ok(publicacion);
            }
            catch (DatoIncorrectoException die)
            {
                return UnprocessableEntity(die.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                List<PublicacionDto> publicaciones = await _servicioPublicacion.ObtenerTodasAsync();
                return Ok(publicaciones);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Eliminar(int id)
        {
            try
            {
                await _servicioPublicacion.EliminarAsync(id, _env.WebRootPath);
                return NoContent();
            }
            catch (NoExisteException nee)
            {
                return NotFound(nee.Message);
            }
        }
    }
}
    
