using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Enum;
using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Models;
using Microsoft.AspNetCore.Http;

namespace Domain.Dto
{
    public class CrearPublicacionDto:IValidable
    {
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public IFormFile Imagen { get; set; }
        public CategoriaServicio Categoria {  get; set; }
        //public string CategoriaNombre { get; set; } = string.Empty;



        public CrearPublicacionDto(string titulo, string descripcion, IFormFile imagen, CategoriaServicio categoria)
        {
            Titulo=titulo;
            Descripcion=descripcion;
            Imagen=imagen;
            Categoria = categoria;
        }

        public CrearPublicacionDto()
        {
        }
        public void Validar()
        {
            ValidarImagen();
        }

        private void ValidarImagen()
        {
            if (Imagen == null || Imagen.Length == 0)
                throw new DatoIncorrectoException("La imagen es obligatoria.");
        }

    }
}
