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
    public class ClienteProfile:Profile
    {
        public ClienteProfile()
        {
            CreateMap<Cliente, ClienteDto>().ForMember(dest => dest.NombreTipoUsuario,
               opt => opt.MapFrom(src => src.TipoUsuario.ToString()));
            CreateMap<ClienteDto, Cliente>()
                .ForMember(dest => dest.Id, act => act.MapFrom(src => src.Id));

        }
    }
}
