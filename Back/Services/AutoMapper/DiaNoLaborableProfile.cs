using Domain.Dto;
using Domain.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.AutoMapper
{
    public class DiaNoLaborableProfile:Profile
    {
        public DiaNoLaborableProfile()
        {
            CreateMap<DiaNoLaborable, DiaNoLaborableDto>();
            CreateMap<DiaNoLaborableDto, DiaNoLaborable>()
                .ForMember(dest => dest.Id, act => act.MapFrom(src => src.Id));
        }
    }
}
