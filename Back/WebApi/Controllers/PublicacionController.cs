using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace WebApi.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class PublicacionController : Controller
    {
        private readonly IServicioPublicacion _servicioPublicacion;

        public PublicacionController(IServicioPublicacion servicioPublicacion)
        {
            _servicioPublicacion=servicioPublicacion;
        }
    }
}
