using AutoMapper;
using AutoMarket.Dtos;
using AutoMarket.Interfeces;
using AutoMarket.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AutoMarket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PreferencesController : Controller
    {
        private readonly IUnitOfWork _repo;
        private readonly IMapper _mapper;

        public PreferencesController(IUnitOfWork repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        // GET: api/Preferences
        [HttpGet, Authorize]
        public async Task<ActionResult> Get()
        {
            var user = await _repo.UserRepository.GetAuthorizedUser((ClaimsIdentity)this.User.Identity);
            Preferences dbElem = await _repo.PreferencesRepository.Get(user);

            var response = _mapper.Map<PreferencesDto>(dbElem);
            return Ok(response);
            
            
        }
        // POST: api/Preferences
        [HttpPost, Authorize]
        public async Task<ActionResult> Post(PreferencesDto request)
        {
            var user = await _repo.UserRepository.GetAuthorizedUser((ClaimsIdentity)this.User.Identity);
            Preferences dbElem = await _repo.PreferencesRepository.Get(user);

            if (user == null || request == null)
                return BadRequest("Not working?!?");

            try
            {
                
                if(dbElem != null)
                {
                    var newdbElement = _mapper.Map<Preferences>(request);
                    dbElem.Brands = newdbElement.Brands != "" ? newdbElement.Brands : String.Empty;
                    dbElem.Models = newdbElement.Models != "" ? newdbElement.Models : String.Empty;
                    dbElem.Categories = newdbElement.Categories != "" ? newdbElement.Categories : String.Empty;
                    dbElem.Counties = newdbElement.Counties != "" ? newdbElement.Counties : String.Empty;
                    dbElem.Years = newdbElement.Years;
                    dbElem.MaxPrice = newdbElement.MaxPrice;
                    dbElem.MinPrice = newdbElement.MinPrice;
                    _repo.ModifyAndSaveAsync(dbElem);
                }
                else
                {
                    dbElem = _mapper.Map<Preferences>(request);
                    dbElem.User = user;
                    _repo.PreferencesRepository.Add(dbElem);
                    _repo.SaveAsync();

                }
                
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest("Not working?!?");
            }
            return Ok();
        }
        // PUT: api/Preferences
        [HttpPut]
        public async Task<ActionResult> Put()
        {
            return Ok();
        }
        // DELETE: api/Preferences
        [HttpDelete]
        public async Task<ActionResult> Delete()
        {
            return Ok();
        }


    }
}
