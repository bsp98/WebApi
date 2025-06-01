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
    public class ReservaProfile:Profile
    {
        public ReservaProfile()
        {
            CreateMap<Reserva, ReservaDto>();
            CreateMap<ReservaDto, Reserva>()
                .ForMember(dest => dest.Id, act => act.MapFrom(src => src.Id));
        }
    }
}
