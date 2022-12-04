using AutoMarket.Dtos;
using AutoMarket.Interfeces;
using AutoMarket.Models;
using Microsoft.EntityFrameworkCore;

namespace AutoMarket.Data.Repo
{
    public class AnnouncementRepository : IAnnouncementRepository
    {
        private readonly DataContext _context;

        public AnnouncementRepository(DataContext context)
        {
            _context = context;
        }

        public void Add(Announcement announcement)
        {
            _context.Announcements.Add(announcement);
        }

        public void Remove(Announcement announcement)
        {
            _context.Announcements.Remove(announcement);
        }

        public async Task<IEnumerable<Announcement>> GetAllAsync()
        {
            List<Announcement> response = await _context.Announcements
                .Include(x => x.Car)
                .Include(x => x.Photos)
                .ToListAsync();

            return response;
        }

        public async Task<Announcement> GetByIdAsync(int id)
        {
           var response = await _context.Announcements
                .Where(p => p.Id == id)
                .Include(x => x.Car)
                .Include(x => x.Photos)
                .FirstAsync();
            return response;
        }

        public async Task<IEnumerable<Announcement>> GetAllByIdsAsync(List<int> ids)
        {
            var response = await _context.Announcements
                .Where(x => ids.Contains(x.Id))
                .Include(x => x.Photos)
                .Include(x => x.Car)
                .ToListAsync();

            return response;
        }

        public async Task<IEnumerable<Announcement>> GetAllByParamsAsync(SearchDto request)
        {
            List<int> carIds = new List<int>();
            IEnumerable<Car> cars = await _context.Cars.ToListAsync();
            List<Announcement> response = new List<Announcement>() ;

            if (request.Brand != "")
            {
                cars = cars.Where(x => x.Brand == request.Brand);
            }
            if (request.Model != "")
            {
                cars = cars.Where(x => x.Model == request.Model);
            }
            if (request.Body != "")
            {
                cars = cars.Where(x => x.Body == request.Body);
            }
            if (request.Year != 0)
            {
                cars = cars.Where(x => x.Year == request.Year);
            }
           
            carIds = cars.Select(x => x.Id).ToList();

            response = await _context.Announcements
                .Include(x => x.Photos)
                .Include(x => x.Car)
                .ToListAsync();

            if (request.County != "" && response != null)
                response = response.Where(x => x.Location == request.County).ToList();

            if (request.Fuel != "" && response != null)
                response = response.Where(x => x.Fuel == request.Fuel).ToList();

            if (carIds != null && response != null)
                response = response.Where(x => carIds.Contains(x.CarId)).ToList();

            response = response.Where(x => x.Price >= request.MinPrice && x.Price <= request.MaxPrice).ToList();

            return response;

        }

        public async Task<List<Announcement>> GetByValuesAsync(AnnouncementPriceEstimationDto input)
        {
            var response = await _context.Announcements
                .Where(x => x.CarId == input.CarId && x.Fuel == input.Fuel &&
                       x.Km < input.Km + 50000 && x.Km > input.Km - 50000)
                .ToListAsync();

            return response;
        }


    }
}
