 Dev

namespace Services.Interfaces.CRUD
{
    public interface IServicioAdd<T>
    {
        T Add(T dto);
    }
}
