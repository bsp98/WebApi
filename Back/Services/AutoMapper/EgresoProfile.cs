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
    public class EgresoProfile : Profile
    {
        public EgresoProfile()
        {
            CreateMap<Egreso, EgresoDto>();
            CreateMap<EgresoDto, Egreso>()
                .ForMember(dest => dest.Id, act => act.MapFrom(src => src.Id));

        }
    }
}
