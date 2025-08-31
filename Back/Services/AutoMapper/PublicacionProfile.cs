using AutoMapper;
using Domain.Dto;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.AutoMapper
{
    public class PublicacionProfile:Profile
    {
        public PublicacionProfile()
        {
            CreateMap<CrearPublicacionDto, Publicacion>()
           .ForMember(dest => dest.ImagenUrl, opt => opt.Ignore()) // porque lo seteamos manualmente
           .ForMember(dest => dest.FechaPublicacion, opt => opt.Ignore()); // lo mismo

            CreateMap<Publicacion, PublicacionDto>()
            .ForMember(dest => dest.CategoriaNombre, opt => opt.MapFrom(src => src.Categoria.ToString().Replace("ni", "ñ")))
            .ForMember(dest => dest.Categoria, opt => opt.MapFrom(src => (int)src.Categoria));



            // CreateMap<Publicacion, CrearPublicacionDto>()
            //.ForMember(dest => dest.CategoriaNombre, opt => opt.MapFrom(src => src.Categoria.ToString().Replace("ni", "ñ")));


        }
    }
}
