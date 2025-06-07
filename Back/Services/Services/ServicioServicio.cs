using Domain.Dto;
using Domain.Models;
using DataAcces.Interfaces;
using Services.Interfaces;
using AutoMapper;
using DataAcces.Repositories;
using Services.Exceptions;


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

            if (_repositorioServicio.BuscarPorNombre(servicioDto.Nombre) != null)
            {
                throw new ExisteException("Ya existe un servicio con ese nombre");
            }

            servicioDto.Validar();

            //Tipo tipo = _repositorioTipo.BuscarXnombre(dto.Tipo.NombreTipo);

            Servicio nuevoServicio = _mapper.Map<Servicio>(servicioDto);
            Servicio servicio  = _repositorioServicio.Add(nuevoServicio);


            return _mapper.Map<ServicioDto>(servicio);
        }

        public void Remove(int id)
        {

            //if (_repositorioServicio.BuscarPorServicio(id).Any())
            //{
            //    throw new EnUsoException("No se puede eliminar un servicio que esta siendo utilizado");
            //}

            Servicio servicio = _repositorioServicio.BuscarPorId(id);

            if (servicio == null) throw new NoExisteException("No se encontro un servicio con ese id");

            _repositorioServicio.Remove(servicio);
        }

        public void Update(int id, ServicioDto dto)
        {
            Servicio servicio = _repositorioServicio.BuscarPorId(id);

            if (servicio == null) throw new NoExisteException("No se encontro un servicio con ese id");

            dto.Validar();
            //_mapper.Map(dto, servicio);
            servicio.Descripcion = dto.Descripcion;
            servicio.Disponibilidad = dto.Disponibilidad;
            servicio.Categoria = dto.Categoria;
            servicio.TiempoDeDuracionMin = dto.TiempoDeDuracionMin;
            servicio.Nombre = dto.Nombre;
            servicio.Precio = dto.Precio;
            

            _repositorioServicio.Update(servicio);
        }

        public List<ServicioDto> ObtenerTodos()
        {
            IEnumerable<Servicio> tipos = _repositorioServicio.ObtenerTodos();
            return _mapper.Map<List<ServicioDto>>(tipos);
        }

        public void DeshabilitarOHabilitar(int id)
        {
            Servicio servicio = _repositorioServicio.BuscarPorId(id);

            if (servicio == null) throw new NoExisteException("No se encontro un servicio con ese id");

            if (servicio.Disponibilidad)
            {
                servicio.Disponibilidad = false;
            }else
            {
                servicio.Disponibilidad = true;
            }
            
            


            _repositorioServicio.Update(servicio);
        }

    }
}
