using AutoMarket.Interfeces;
using AutoMarket.Models;
using Microsoft.EntityFrameworkCore;

namespace AutoMarket.Data.Repo
{
    public class CarRepository : ICarRepository
    {
        private readonly DataContext _context;

        public CarRepository(DataContext context)
        {
            _context = context;
        }
        public void Add(Car car) {
            _context.Cars.Add(car);
        }

        public Boolean Remove(int CarId) {

            var car = _context.Cars.Find(CarId);

            if (car != null)
            {
                _context.Cars.Remove(car);
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<Car> FindById(int id)
        {
            var response = await _context.Cars.Where(x =>x.Id == id ).FirstOrDefaultAsync();
            return response;
        }

        public async Task<Car> FindByValues(string brand, string model, string body, int year)
        {

            var response = await _context.Cars.Where(x =>
                                                    x.Brand == brand &&
                                                    x.Model == model &&
                                                    x.Body == body &&
                                                    x.Year == year).FirstOrDefaultAsync();
            return response;
        }

        public async Task<List<string>> GetBrands()
        {
            var response = await _context.Cars
                .Select(i => i.Brand)
                .Distinct()
                .OrderBy(i => i)
                .ToListAsync();
            return response;
        }

        public async Task<List<string>> GetModels(string brand)
        {
            if(brand != "n")
            {
                var response = await _context.Cars
                   .Where(i => i.Brand.ToLower() == brand.ToLower())
                   .Select(i => i.Model)
                   .Distinct()
                   .OrderBy(i => i)
                   .ToListAsync();

                return response;
            }
            else
            {
                var response = await _context.Cars
                   .Select(i => i.Model)
                   .Distinct()
                   .OrderBy(i => i)
                   .ToListAsync();
                return response;
            }
           

            
        }

        public async Task<List<string>> GetBodys(string brand, string model)
        {
            
            if (brand != "n" && model != "n")
            {
                var response = await _context.Cars
                     .Where(i => i.Brand.ToLower() == brand.ToLower() && i.Model.ToLower() == model.ToLower())
                     .Select(i => i.Body)
                     .Distinct()
                     .OrderBy(i => i)
                     .ToListAsync();

                return response;
            }
            else
            {
                var response = await _context.Cars
                   .Select(i => i.Body)
                   .Distinct()
                   .OrderBy(i => i)
                   .ToListAsync();
                return response;
            }
        }

        public async Task<List<int>> GetYears(string brand, string model, string body)
        {

            if (brand != "n" && model != "n" && body != "n")
            {
                var response = await _context.Cars
                .Where(i => i.Brand.ToLower() == brand.ToLower() && i.Model.ToLower() == model.ToLower()
                                                                 && i.Body.ToLower() == body.ToLower())
                .Select(i => i.Year)
                .Distinct()
                .ToListAsync();

                return response;
            }
            else
            {
                var response = await _context.Cars
                   .Select(i => i.Year)
                   .Distinct()
                   .OrderBy(i => i)
                   .ToListAsync();

                return response;
            }
        }

        public async Task<Car> SearchByValues(string model, string body, int year)
        {

             Car car = await _context.Cars
                .Where(x => x.Model.ToLower() == model.ToLower() 
                            && x.Body.ToLower() == body.ToLower() 
                            && x.Year == year)
                            .FirstOrDefaultAsync();

            if(car == null)
            {
                car = await _context.Cars
                    .Where(x => x.Model.ToLower() == model.ToLower())
                    .FirstOrDefaultAsync();

                return car;
            }
            else
            {
                return car;
            }


        }
    }
}