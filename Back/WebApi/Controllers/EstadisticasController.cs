using Domain.Dto;
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

        [HttpGet("resumen")]
        public ActionResult<GeneralEstadisticaDto> GetResumenGeneral()
        {
            GeneralEstadisticaDto resumen = _servicioEstadistica.ObtenerResumenGeneral();
            return Ok(resumen);
        }
    }
}
