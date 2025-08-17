using AutoMapper;
using Domain.Dto;
using Domain.Models;

namespace Services.AutoMapper
{
    public class ModoDePagoProfile : Profile
    {

     public ModoDePagoProfile()
    {
        CreateMap<ModoDePago, ModificarInterfazPagoDto>().ForMember(dest => dest.NombreTipoDePago,
        opt => opt.MapFrom(src => src.TipoDePago.ToString()));
    }
}
}

