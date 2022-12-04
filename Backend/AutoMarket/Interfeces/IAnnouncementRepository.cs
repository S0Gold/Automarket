using AutoMarket.Dtos;
using AutoMarket.Models;

namespace AutoMarket.Interfeces
{
    public interface IAnnouncementRepository
    {
        void Add(Announcement announcement);
        void Remove(Announcement announcement);
        Task<IEnumerable<Announcement>> GetAllAsync();
        Task<Announcement> GetByIdAsync(int id);
        Task<IEnumerable<Announcement>>  GetAllByIdsAsync(List<int> ids);
        Task<IEnumerable<Announcement>> GetAllByParamsAsync(SearchDto request);
        Task<List<Announcement>> GetByValuesAsync(AnnouncementPriceEstimationDto input);

    }
}
