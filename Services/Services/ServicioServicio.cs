using Domain.Dto;
using Domain.Models;
using DataAcces.Interfaces;
using Services.Interfaces;
using AutoMapper;
using DataAcces.Repositories;


namespace Services.Services
{
    public class ServicioServicio:IServicioServicio
    {
        private readonly IRepositorioServicio _repositorioServicio;
        private readonly IMapper _mapper;


        public ServicioServicio(IRepositorioServicio repositorioServicio, IMapper mapper)
        {
            _repositorioServicio = repositorioServicio;
            _mapper = mapper;
        }



        public ServicioDto Add(ServicioDto servicioDto)
        {

            //Servicio? cabanaExistene = _repositorioServicio.BuscarXnombre(servicio.Nombre);

            //se controla que el nombre de la cabana no exsista
            //if (cabanaexistene != null){
            //    throw new entidadexistenteexception("ya existe una cabaña con ese nombre");
            //}

            //dto.Validar();

            //Tipo tipo = _repositorioTipo.BuscarXnombre(dto.Tipo.NombreTipo);

            Servicio nuevoServicio = _mapper.Map<Servicio>(servicioDto);
            Servicio servicio  = _repositorioServicio.Add(nuevoServicio);

           //Se asigna el id autogenerado y el numero de habitacion al dto

            return _mapper.Map<ServicioDto>(servicio);
        }

        public void Remove(int id)
        {
            throw new NotImplementedException();
        }

        public void Update(int id, ServicioDto dto)
        {
            throw new NotImplementedException();
        }
    }
}
