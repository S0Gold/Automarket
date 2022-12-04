using AutoMarket.Data.Repo;
using AutoMarket.Interfeces;
using AutoMarket.Models;
using Microsoft.EntityFrameworkCore;

namespace AutoMarket.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;

        public UnitOfWork(DataContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public IAnnouncementRepository AnnouncementRepository => new AnnouncementRepository(_context);
        public IUserRepository UserRepository =>  new UserRepository(_context);
        public ICarRepository CarRepository =>  new CarRepository(_context);
        public IUserAnnouncementRepository UserAnnouncementRepository =>  new UserAnnouncementRepository(_context);
        public IPhotoRepository PhotoRepository => new PhotoRepository(_context, _config);

        public IPreferencesRepository PreferencesRepository => new PreferencesRepository(_context);

        public IPriceEstimationRepository PriceEstimationRepository => new PriceEstimationRepository(_context);
        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> ModifyAndSaveAsync(params object[] request)
        {
            _context.Entry(request[0]).State = EntityState.Modified;
            return await _context.SaveChangesAsync() > 0;
        }

    }
}
