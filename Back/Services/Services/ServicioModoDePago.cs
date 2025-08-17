using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Services.Interfaces;
using Domain.Dto;
using Domain.Models;
using DataAcces.Interfaces;
using Domain.Enum;
using Microsoft.JSInterop.Infrastructure;
using AutoMapper;

namespace Services.Services
{
    public class ServicioModoDePago : IServicioModoDePago
    {
        private readonly IRepositorioModoDePago _repositorioTipoDePago;
        private readonly IMapper _mapper;

        public ServicioModoDePago(IRepositorioModoDePago repositorioTipoDePago, IMapper mapper)
        {
            _repositorioTipoDePago = repositorioTipoDePago;
            _mapper = mapper;
        }

        public ModificarInterfazPagoDto CambiarTipoDePago(ModificarInterfazPagoDto dto)
        {
            dto.Validar();
            IEnumerable<ModoDePago> tipoDePago = _repositorioTipoDePago.GetAll();
            ModoDePago modoDePago;
            if(tipoDePago.Count() == 0)
            {
                ModoDePago nuevoTipoDePago = new ModoDePago(dto.TipoDePago);
                modoDePago = nuevoTipoDePago;
                _repositorioTipoDePago.Add(modoDePago);
            }
            else
            {
                modoDePago = tipoDePago.First();
                modoDePago.TipoDePago = dto.TipoDePago;
                _repositorioTipoDePago.Update(modoDePago);
            }
            return _mapper.Map<ModificarInterfazPagoDto>(modoDePago);
        }

        public ModificarInterfazPagoDto ObtenerModoDePago()
        {
            IEnumerable<ModoDePago> tipoDePago = _repositorioTipoDePago.GetAll();
            ModoDePago modoDePago = tipoDePago.First();
            return _mapper.Map<ModificarInterfazPagoDto>(modoDePago);

        }
    }
}
