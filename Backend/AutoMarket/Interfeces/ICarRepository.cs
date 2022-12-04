using AutoMarket.Models;

namespace AutoMarket.Interfeces
{
    public interface ICarRepository
    {
        void Add(Car car);
        Boolean Remove(int CarId);
        Task<Car> FindById(int id);
        Task<Car> FindByValues(string brand, string model, string body, int year);
        Task<List<string>> GetBrands();
        Task<List<string>> GetModels(string brand);
        Task<List<string>> GetBodys(string brand, string model);
        Task<List<int>> GetYears(string brand, string model, string body);

        Task<Car> SearchByValues(string model, string body, int year);
    }
}
