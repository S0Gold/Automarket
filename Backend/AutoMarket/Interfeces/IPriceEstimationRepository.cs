using AutoMarket.Dtos;
using AutoMarket.Models;

namespace AutoMarket.Interfeces
{
    public interface IPriceEstimationRepository
    {
        void Add(PriceEstimation input);
        void Remove(int id);
        Task<IEnumerable<Announcement>> GetAllAsync();
        Task<Announcement> GetByCarIdAsync(int id);
        Task<List<PriceEstimation>> GetByValuesAsync(AnnouncementPriceEstimationDto input);


    }
}
