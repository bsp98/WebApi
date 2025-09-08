using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Publicacion
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public string ImagenUrl { get; set; } = string.Empty;
        public DateTime FechaPublicacion { get; set; }
        public CategoriaServicio Categoria { get; set; }


        public Publicacion(int id, string titulo, string descripcion, string imagenUrl, CategoriaServicio categoria)
        {
            Id=id;
            Titulo=titulo;
            Descripcion=descripcion;
            ImagenUrl=imagenUrl;
            FechaPublicacion=DateTime.Now;
            Categoria = categoria;
        }

        public Publicacion() { }
    }
}
