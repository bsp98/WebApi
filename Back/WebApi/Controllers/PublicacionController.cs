using Domain.Dto;
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
    public class PublicacionController : Controller
    {
        private readonly IServicioPublicacion _servicioPublicacion;
        private readonly IWebHostEnvironment _env;

        public PublicacionController(IServicioPublicacion servicioPublicacion,IWebHostEnvironment env)
        {
            _servicioPublicacion=servicioPublicacion;
            _env = env;
        }


        [Authorize(Roles = "Administrador")]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpPost]
        public async Task<IActionResult> Crear([FromForm] CrearPublicacionDto dto)
        {
            try
            {
                var rutaWeb = "/imagenes/publicaciones";
                var rutaFisica = Path.Combine(_env.WebRootPath, "imagenes", "publicaciones");

                PublicacionDto publicacion = await _servicioPublicacion.CrearPublicacionAsync(dto, rutaWeb, rutaFisica);

                publicacion.ImagenUrl= Url(publicacion.ImagenUrl);

                return Ok(publicacion);
            }
            catch (DatoIncorrectoException die)
            {
                return UnprocessableEntity(die.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            List<PublicacionDto> publicaciones = await _servicioPublicacion.ObtenerTodasAsync();

            foreach (PublicacionDto p in publicaciones)
            {
                p.ImagenUrl = Url(p.ImagenUrl);
            }

            return Ok(publicaciones);
        }

        [Authorize(Roles = "Administrador")]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Eliminar(int id)
        {
            try
            {
                await _servicioPublicacion.EliminarAsync(id, _env.WebRootPath);
                return Ok();
            }
            catch (NoExisteException nee)
            {
                return NotFound(nee.Message);
            }
        }

        [HttpGet("Paginado")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetPublicacionesPaginados([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var (pubicaciones, total) = _servicioPublicacion.ObtenerPublicacionesPaginados(page, pageSize);

                foreach (PublicacionDto p in pubicaciones)
                {
                    p.ImagenUrl = Url(p.ImagenUrl);
                }

                return Ok(new
                {
                    data = pubicaciones,
                    totalItems = total
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor");
            }
        }

        [HttpGet("FiltroAnio")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> FiltroPorAnio([FromQuery] int? anio)
        {
            try
            {
                List<PublicacionDto> publicaciones = await _servicioPublicacion.ObtenerPorAnioAsync(anio);

                foreach (PublicacionDto p in publicaciones)
                {
                    p.ImagenUrl = Url(p.ImagenUrl);
                }

                return Ok(publicaciones);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor");
            }
        }


        [HttpGet("categoria/{categoria}")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public IActionResult ObtenerPorCategoria(CategoriaServicio categoria)
        {
            try
            {
                List<PublicacionDto> publicacionDto = _servicioPublicacion.ObtenerPorCategoria(categoria);

                foreach (PublicacionDto p in publicacionDto)
                {
                    p.ImagenUrl = Url(p.ImagenUrl);
                }
                
                return Ok(publicacionDto);
            }
            catch (DatoIncorrectoException die)
            {
                return UnprocessableEntity(die.Message);
            }

        }
        private string Url(string url)
        {
            if (string.IsNullOrWhiteSpace(url)) return url;

            if (Uri.TryCreate(url, UriKind.Absolute, out _)) return url;

            var baseUri = new Uri($"{Request.Scheme}://{Request.Host}{Request.PathBase}");
            return new Uri(baseUri, url.StartsWith("/") ? url : "/" + url).ToString();
        }
    }
}
    
