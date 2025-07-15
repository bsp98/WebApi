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
            CreateMap<Reserva, ReservaDto>().ForMember(dest => dest.NombreEstadoDePago,
               opt => opt.MapFrom(src => src.EstadoDePago.ToString())); ;
            CreateMap<ReservaDto, Reserva>();
            //    .ForMember(dest => dest.Id, act => act.MapFrom(src => src.Id))
            //.ForMember(dest => dest.EstadoDePago, opt => opt.MapFrom(src => src.EstadoDePago.ToString()));

        }
    }
}
