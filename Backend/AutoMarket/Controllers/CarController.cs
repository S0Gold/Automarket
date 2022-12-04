using AutoMapper;
using AutoMarket.Data;
using AutoMarket.Interfeces;
using AutoMarket.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AutoMarket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly IUnitOfWork _repo;

        public CarController(IUnitOfWork repo)
        {
            _repo = repo;
        }

        [HttpGet("GetMakes")]
        public async Task<ActionResult> GetBrands()
        {
            var brands = await _repo.CarRepository.GetBrands();
            return Ok(brands);
        }

        [HttpGet("GetModels")]
        public async Task<ActionResult> GetModels(string brand)
        {
            var models = await _repo.CarRepository.GetModels(brand);
            return Ok(models);
        }

        [HttpGet("GetCategory")]
        public async Task<ActionResult> GetCategory(string brand, string model)
        {
            var bodys = await _repo.CarRepository.GetBodys(brand, model);
            return Ok(bodys);
        }

        [HttpGet("GetYear")]
        public async Task<ActionResult> GetYear(string brand, string model, string body)
        {

            var bodys = await _repo.CarRepository.GetYears(brand, model, body);
            return Ok(bodys);
        }

    }
}
