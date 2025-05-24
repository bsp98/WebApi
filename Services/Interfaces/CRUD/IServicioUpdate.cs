 Dev

namespace Services.Interfaces.CRUD
{
    public interface IServicioUpdate<T>
    {
        void Update(int id, T dto);
    }
}
