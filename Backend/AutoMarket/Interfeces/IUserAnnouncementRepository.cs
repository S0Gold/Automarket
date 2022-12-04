using AutoMarket.Models;

namespace AutoMarket.Interfeces
{
    public interface IUserAnnouncementRepository
    {
        public void Add(UserAnnouncement newUA);
        public void Remove(UserAnnouncement UA);
        Task<UserAnnouncement> GetByIdAsync(int userId, int announcementId);
        Task<int> GetUserByAnnouncementIdAsync(int announcementId);
        Task<List<int>> GetAllFavAnnouncementIdsAsync(int id);
        Task<int> GetAnnouncementViewNumberByAnnId(int id);
        Task<List<int>> GetAnnouncementIdsByUserId(int userId);
        Task<List<int>> GetViewedAnnouncementIds(int userId);
    }
}
