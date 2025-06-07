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

    public class ServicioProfile : Profile
    {
        public ServicioProfile()
        {
            CreateMap<Servicio, ServicioDto>()
            .ForMember(dest => dest.CategoriaNombre, opt => opt.MapFrom(src => src.Categoria.ToString().Replace("ni", "ñ")));

            CreateMap<ServicioDto, Servicio>()
                    .ForMember(dest => dest.ServicioId, act => act.MapFrom(src => src.ServicioId));
        }
    }

}