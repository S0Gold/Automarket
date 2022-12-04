using AutoMapper;
using AutoMarket.Dtos;
using AutoMarket.Helpers;
using AutoMarket.Interfeces;
using AutoMarket.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace AutoMarket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PriceEstimationController : ControllerBase
    {
        private readonly IUnitOfWork _repo;
        private readonly IMapper _mapper;
        public PriceEstimationController(IUnitOfWork repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpPost("GetPriceEstimation")]
        public async Task<ActionResult<int>> Get(AnnouncementPriceEstimationDto input)
        {
            if (input == null)
                return BadRequest("Invalid Body");

            var car = await _repo.CarRepository.FindById(input.CarId);

            if (car == null)
                return BadRequest("Invalid Body");

            var dataForPrice = await _repo.PriceEstimationRepository.GetByValuesAsync(input);
            var announcements = await _repo.AnnouncementRepository.GetByValuesAsync(input);

            dataForPrice.AddRange(_mapper.Map<List<PriceEstimation>>(announcements));

            if (dataForPrice.Count <= 1)
            {
                return Ok(new EstimationPriceResponseDto());
            }

            int medianPrice = 0;
            dataForPrice = dataForPrice.OrderBy(x => x.Price).ToList();

            if (dataForPrice.Count % 2 == 0)
            {
                medianPrice = dataForPrice[dataForPrice.Count / 2].Price;
            }
            else
            {
                medianPrice = (dataForPrice[dataForPrice.Count / 2].Price + dataForPrice[dataForPrice.Count / 2 + 1].Price) / 2;
            }


            double avgPirce = dataForPrice.Sum(a => a.Price) / dataForPrice.Count;
            int standardDeviation = 0;

            dataForPrice.ForEach(a => standardDeviation += (int)Math.Pow((medianPrice - a.Price), 2));
            standardDeviation = (int)Math.Sqrt(standardDeviation / (dataForPrice.Count - 1));



            return Ok(new EstimationPriceResponseDto
                        {
                            Price = input.Price,
                            EstimatedPrice = medianPrice,
                            GaussBell = standardDeviation
                        } 
            ); 
        }
       

        [HttpPost("AddValuesForPriceEstimation"),Authorize(Roles ="Admin")]
        public async Task<ActionResult<Boolean>> Post()
        {
            Car newCar;
            using (StreamReader sr = System.IO.File.OpenText("Date.txt"))
            {
                string line = String.Empty;
                while ((line = sr.ReadLine()) != null)
                {
                    if (line.StartsWith(","))
                        line = line.Substring(1);

                    string[] words = line.Split(',');

                    if (words.Length <= 5)
                        continue;

                    PriceEstimation priceEstimation = new PriceEstimation();
                    priceEstimation.Price = (int)(Double.Parse(words[0]));
                    priceEstimation.Km = Int32.Parse(words[5]);
                    priceEstimation.Fuel = StringHelper.FirstLetterToUpper(words[4]);

                    var dbCar = await _repo.CarRepository.SearchByValues(words[1], words[2], Int32.Parse(words[3]));

                    if (dbCar != null)
                    {
                        if (dbCar.Year == Int32.Parse(words[3]) && words[2].ToLower().Equals(dbCar.Body.ToLower()))
                        {
                            priceEstimation.Car = dbCar;
                            _repo.PriceEstimationRepository.Add(priceEstimation);
                            await _repo.SaveAsync();
                        }
                        else
                        {
                            try
                            {
                                newCar = new Car
                                {
                                    Brand = dbCar.Brand,
                                    Model = dbCar.Model,
                                    Body = StringHelper.FirstLetterToUpper(words[2]),
                                    Year = Int32.Parse(words[3])
                                };
                                _repo.CarRepository.Add(newCar);
                                await _repo.SaveAsync();

                                priceEstimation.Car = newCar;
                                _repo.PriceEstimationRepository.Add(priceEstimation);
                                await _repo.SaveAsync();
                            }
                            catch (Exception ex)
                            {
                                line += ex;

                            }

                        }
                    }
                    else
                    {
                        try
                        {
                            newCar = new Car
                            {
                                Brand = "Other",
                                Model = StringHelper.FirstLetterToUpper(words[1]),
                                Body = StringHelper.FirstLetterToUpper(words[2]),
                                Year = Int32.Parse(words[3])
                            };
                            _repo.CarRepository.Add(newCar);
                            await _repo.SaveAsync();

                            priceEstimation.Car = newCar;
                            _repo.PriceEstimationRepository.Add(priceEstimation);
                            await _repo.SaveAsync();
                        }
                        catch (Exception ex)
                        {

                            line += ex;
                        }

                    }


                }
            }
            return Ok(true);
        }
    }
}
