
using AutoMapper;
using Domain.Dto;
using Domain.Models;

namespace Services.AutoMapper
{
    public class ClienteGoogleProfile:Profile
    {
        public ClienteGoogleProfile()
        {
            CreateMap<Usuario, ClienteGoogleDto>().ForMember(dest => dest.NombreTipoUsuario,
               opt => opt.MapFrom(src => src.TipoUsuario.ToString())); ;
            CreateMap<ClienteGoogleDto, Cliente>()
                .ForMember(dest => dest.Id, act => act.MapFrom(src => src.Id));

        }
    }
}
