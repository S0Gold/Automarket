#nullable disable
using AutoMapper;
using AutoMarket.Dtos;
using AutoMarket.Helpers;
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
    public class AnnouncementsController : ControllerBase
    {
        private readonly IUnitOfWork _repo;
        private readonly IMapper _mapper;

        public AnnouncementsController(IUnitOfWork repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        // GET: api/Announcements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnnouncementViewDto>>> GetAnnouncements()
        {

            var dbResponse = await _repo.AnnouncementRepository.GetAllAsync();
            var response = _mapper.Map<IEnumerable<AnnouncementViewDto>>(dbResponse);

            return Ok(response);
        }

        [HttpGet("GetByUserId/{id}")]
        public async Task<ActionResult<IEnumerable<AnnouncementViewDto>>> GetByUserId(int id)
        {

            var Ids = await _repo.UserAnnouncementRepository.GetAnnouncementIdsByUserId(id);

            var dbResponse = await _repo.AnnouncementRepository.GetAllByIdsAsync(Ids);
            var response = _mapper.Map<IEnumerable<AnnouncementViewDto>>(dbResponse);

            return Ok(response);
        }

        [HttpGet("RecentAnnouncements")]
        public async Task<ActionResult<IEnumerable<AnnouncementViewDto>>> GetRecentAnnouncements()
        {

            var dbResponse = await _repo.AnnouncementRepository.GetAllAsync();
            var response = _mapper.Map<IEnumerable<AnnouncementViewDto>>(dbResponse.OrderByDescending(x => x.RegistrationDate));

            return Ok(response);
        }

        [HttpGet("MostViewedAnnouncements")]
        public async Task<ActionResult<IEnumerable<AnnouncementViewDto>>> GetMostViewedAnnouncements()
        {

            var dbResponse = await _repo.AnnouncementRepository.GetAllAsync();

            dbResponse.OrderByDescending(x => _repo.UserAnnouncementRepository.GetAnnouncementViewNumberByAnnId(x.Id));

            var response = _mapper.Map<IEnumerable<AnnouncementViewDto>>(dbResponse);

            return Ok(response);
        }

        [HttpGet("RecomandedAnnouncements"), Authorize]
        public async Task<ActionResult<IEnumerable<AnnouncementViewDto>>> GetRecomandedAnnouncements()
        {
            var user = await _repo.UserRepository.GetAuthorizedUser((ClaimsIdentity)this.User.Identity);

            var announcements = await _repo.AnnouncementRepository.GetAllAsync();
            var announcementsView = _mapper.Map<IEnumerable<AnnouncementViewDto>>(announcements);

            //Get user preferences 
            Preferences preferences = await _repo.PreferencesRepository.Get(user);


            if (preferences != null)
            {
                var preferencesView = _mapper.Map<PreferencesDto>(preferences);
                return Ok(Recomandation.CalculateScores(announcementsView, preferencesView));
            }
            else
            {
                //User didn't set preferences, get all ids for favorite announcements
                var favAnnouncementsIds = await _repo.UserAnnouncementRepository.GetAllFavAnnouncementIdsAsync(user.Id);

                if(favAnnouncementsIds.Count > 0) 
                {
                    var favAnnouncements = await _repo.AnnouncementRepository.GetAllByIdsAsync(favAnnouncementsIds);
                    var response = _mapper.Map<IEnumerable<AnnouncementViewDto>>(favAnnouncements);


                    var preferencesView = Recomandation.SetValuesForPreferences(response);
                    var rep = Recomandation.CalculateScores(announcementsView, preferencesView);
                    return Ok(rep);
                }
                else
                {
                    var Ids = await _repo.UserAnnouncementRepository.GetViewedAnnouncementIds(user.Id);
                    if(Ids.Count > 0)
                    {
                        var favAnnouncements = await _repo.AnnouncementRepository.GetAllByIdsAsync(Ids);
                        var response = _mapper.Map<IEnumerable<AnnouncementViewDto>>(favAnnouncements);


                        var preferencesView = Recomandation.SetValuesForPreferences(response);
                        var rep = Recomandation.CalculateScores(announcementsView, preferencesView);
                        return Ok(rep);
                    }
                    else
                    {
                        var dbResponse = await _repo.AnnouncementRepository.GetAllAsync();
                        var response = _mapper.Map<IEnumerable<AnnouncementViewDto>>(dbResponse);

                        var rnd = new Random();
                        return Ok(response.OrderBy(item => rnd.Next()));
                    }
                    
                }


            }
        }


        [HttpPost("GetAnnouncementsByParams")]
        public async Task<ActionResult<IEnumerable<AnnouncementViewDto>>> GetAnnouncemetsByParams(SearchDto request)
        {

            var dbResponse = await _repo.AnnouncementRepository.GetAllByParamsAsync(request);

            if (dbResponse != null)
            {
                var response = _mapper.Map<IEnumerable<AnnouncementViewDto>>(dbResponse);
                return Ok(response);
            }
            else
            {
                return BadRequest("Niciun anunt nu a fost gasit");
            }
        }

        // GET: api/Announcements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AnnouncementViewDto>> GetAnnouncement(int id)
        {
            var announcement = await _repo.AnnouncementRepository.GetByIdAsync(id);
            if (announcement == null)
                return NotFound("Announcement not found!");

            var response = _mapper.Map<AnnouncementViewDto>(announcement);

            return Ok(response);
        }

        // PUT: api/Announcements/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> PutAnnouncement(int id, AnnouncementEditDto request)
        {
            if (request == null || id == null)
                return BadRequest("Null parameters");

            var announcement = await _repo.AnnouncementRepository.GetByIdAsync(id);
            var user = await _repo.UserRepository.GetAuthorizedUser((ClaimsIdentity)this.User.Identity);
            var link = await _repo.UserAnnouncementRepository.GetByIdAsync(user.Id, announcement.Id);

            if (link == null || !link.IsOwner)
                return BadRequest("Do not have the permission");

            var newCar = (await _repo.CarRepository.FindByValues(request.Brand, request.Model, request.Body, request.Year));
            if (announcement.Car.Id != newCar.Id)
                announcement.CarId = newCar.Id;
            announcement.Fuel = request.Fuel;
            announcement.HP = request.HP;
            announcement.Km = request.Km;
            announcement.Color = request.Color;
            announcement.Price = request.Price;
            announcement.Pollution = request.Pollution;
            announcement.Description = request.Description;
            announcement.Location = request.County;
            announcement.Latitude = request.Latitude;
            announcement.Longitude = request.Longitude;
            announcement.Options = string.Join(",", request.Options);
            announcement.RegistrationDate = DateTime.Now;

            try
            {
                await _repo.ModifyAndSaveAsync(announcement);
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return Ok();
        }

        // POST: api/Announcements
        [HttpPost, Authorize]
        public async Task<ActionResult<int>> PostAnnouncement(AnnouncementAddDto request)
        {
            var user = await _repo.UserRepository.GetAuthorizedUser(this.User.Identity as ClaimsIdentity);

            var newAnnouncement = _mapper.Map<Announcement>(request);

            var dbResponse = await _repo.CarRepository.FindByValues(request.Brand, request.Model, request.Body, request.Year);
            newAnnouncement.CarId = dbResponse.Id;
            newAnnouncement.RegistrationDate = DateTime.Now;

            string validationString = AnnouncementValidation.Validate(newAnnouncement);

            if (validationString.Equals("OK"))
            {
                _repo.AnnouncementRepository.Add(newAnnouncement);
                await _repo.SaveAsync();

                _repo.UserAnnouncementRepository.Add(new UserAnnouncement
                {
                    User = user,
                    Announcement = newAnnouncement,
                    IsOwner = true
                }
                    );
                await _repo.SaveAsync();

                return Ok(newAnnouncement.Id);
            }
            else
            {
                return BadRequest(validationString);
            }

        }

        // DELETE: api/Announcements/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnnouncement(int id)
        {
            var announcement = await _repo.AnnouncementRepository.GetByIdAsync(id);
            if (announcement == null)
                return NotFound();

            _repo.AnnouncementRepository.Remove(announcement);
            await _repo.SaveAsync();

            return Ok();
        }

    }
}
