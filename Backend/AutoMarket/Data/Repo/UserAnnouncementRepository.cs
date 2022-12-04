using AutoMarket.Interfeces;
using AutoMarket.Models;
using Microsoft.EntityFrameworkCore;

namespace AutoMarket.Data.Repo
{
    public class UserAnnouncementRepository : IUserAnnouncementRepository
    {
        private readonly DataContext _context;

        public UserAnnouncementRepository(DataContext context)
        {
            _context = context;
        }

        public void Add(UserAnnouncement newUA)
        { 
            _context.UserAnnouncements.Add(newUA);
        }

        public void Remove(UserAnnouncement UA)
        {
            _context.Remove(UA);
        }

        public async Task<UserAnnouncement> GetByIdAsync(int userId, int announcementId)
        {
            var response = await _context.UserAnnouncements
                 .Where(x => x.UserId == userId && x.AnnouncementId == announcementId)
                 .FirstOrDefaultAsync();

            return response;
        }

        public async Task<int> GetUserByAnnouncementIdAsync(int announcementId)
        {
            var response = await _context.UserAnnouncements
                 .Where(x => x.AnnouncementId == announcementId && x.IsOwner == true)
                 .Select(x => x.UserId)
                 .FirstOrDefaultAsync();

            return response;
        }


        public async Task<List<int>> GetAllFavAnnouncementIdsAsync(int userId)
        {
           var response =  await _context.UserAnnouncements
                .Where(x => x.UserId == userId && x.IsFavorite == true)
                .Select(x => x.AnnouncementId)
                .ToListAsync();

            return response;
        }

        public async Task<int> GetAnnouncementViewNumberByAnnId(int id)
        {
            var response = await _context.UserAnnouncements
               .Where(x => x.AnnouncementId == id && x.Seen == true)
               .ToListAsync(); 

            return response.Count;
        }

        public async Task<List<int>> GetViewedAnnouncementIds(int uderId)
        {
            var response = await _context.UserAnnouncements
               .Where(x => x.UserId == uderId && x.Seen == true)
               .Select(x => x.AnnouncementId)
               .ToListAsync();

            return response;
        }

        public async Task<List<int>> GetAnnouncementIdsByUserId(int id)
        {
            var response = await _context.UserAnnouncements
               .Where(x => x.UserId == id && x.IsOwner == true)
               .Select(x => x.AnnouncementId)
               .ToListAsync();

            return response;
        }

    }
}
