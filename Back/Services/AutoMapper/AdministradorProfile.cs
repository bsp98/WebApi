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
    public class AdministradorProfile:Profile
    {
        public AdministradorProfile()
        {
            CreateMap<Administrador, AdministradorDto>().ForMember(dest => dest.NombreTipoUsuario,
               opt => opt.MapFrom(src => src.TipoUsuario.ToString()));
            CreateMap<AdministradorDto, Administrador>()
                .ForMember(dest => dest.Id, act => act.MapFrom(src => src.Id));

        }
    }
}
