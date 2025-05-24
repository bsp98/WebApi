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
                CreateMap<Servicio, ServicioDto>();
                CreateMap<ServicioDto, Servicio>()
                    .ForMember(dest => dest.ServicioId, act => act.MapFrom(src => src.ServicioId));
            }
        }
    
}
