using Domain.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadisticasController : Controller
    {
        private readonly IServicioEstadistica _servicioEstadistica;

        public EstadisticasController(IServicioEstadistica servicioEstadistica)
        {
            _servicioEstadistica = servicioEstadistica;
        }



        [Authorize(Roles = "Administrador")]
        [HttpGet("resumen")]
        public IActionResult ObtenerResumen([FromQuery] int? anio)
        {
            var resultado = _servicioEstadistica.ObtenerResumenGeneral(anio);
            return Ok(resultado);
        }



    }
}
