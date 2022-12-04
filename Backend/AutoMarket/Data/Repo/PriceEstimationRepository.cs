using AutoMarket.Dtos;
using AutoMarket.Interfeces;
using AutoMarket.Models;
using Microsoft.EntityFrameworkCore;

namespace AutoMarket.Data.Repo
{
    public class PriceEstimationRepository : IPriceEstimationRepository
    {
        private readonly DataContext _context;
        public PriceEstimationRepository(DataContext context)
        {
            _context = context;
        }

        public void Add(PriceEstimation input)
        {
            _context.PriceEstimations.Add(input);
        }

        public Task<IEnumerable<Announcement>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Announcement> GetByCarIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public void Remove(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<PriceEstimation>> GetByValuesAsync(AnnouncementPriceEstimationDto input)
        {
            var response = await _context.PriceEstimations
                .Where(x => x.CarId == input.CarId && x.Fuel == input.Fuel &&
                       x.Km < input.Km + 50000 && x.Km > input.Km - 50000)
                .ToListAsync();

            if (response.Count == 0)
            {
                var car = await _context.Cars.FirstOrDefaultAsync(x => x.Id == input.CarId);
                var carsIds = await _context.Cars
                    .Where(x => (x.Year == (car.Year + 1) || x.Year == (car.Year - 1))
                                && x.Model == car.Model && x.Body == car.Body
                    )
                    .Select(x => x.Id).ToListAsync();

                response = await _context.PriceEstimations
                  .Where(x => carsIds.Contains(x.Id) && x.Fuel == input.Fuel &&
                         x.Km < input.Km + 50000 && x.Km > input.Km - 50000)
                  .ToListAsync();
                if (response.Count == 0)
                {
                    response = await _context.PriceEstimations
                        .Where(x => x.CarId == input.CarId && x.Fuel == input.Fuel &&
                               x.Km < input.Km + 100000 && x.Km > input.Km - 100000)
                        .ToListAsync();
                }
            }

            return response;
        }
    }
}
