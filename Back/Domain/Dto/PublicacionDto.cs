using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class PublicacionDto
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public string ImagenUrl { get; set; }
        public DateTime FechaPublicacion { get; set; } = DateTime.Now;
        public string CategoriaNombre { get; set; } = string.Empty;
    }
}
