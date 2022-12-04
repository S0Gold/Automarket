using AutoMapper;
using AutoMarket.Data;
using AutoMarket.Dtos;
using AutoMarket.Interfeces;
using AutoMarket.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AutoMarket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAnnouncementController : ControllerBase
    {
        private readonly IUnitOfWork _repo;
        private readonly IMapper _mapper;

        public UserAnnouncementController(IUnitOfWork repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;

        }

        // GET api/<UserAnnouncementController>
        [HttpGet("GetFavoriteAnnouncements"),Authorize]
        public async Task<ActionResult<List<AnnouncementViewDto>>> Get()
        {
            var user = await _repo.UserRepository.GetAuthorizedUser((ClaimsIdentity)User.Identity);

            var announcementsId = await _repo.UserAnnouncementRepository.GetAllFavAnnouncementIdsAsync(user.Id);

            var announcements = await _repo.AnnouncementRepository.GetAllByIdsAsync(announcementsId);

            var response = _mapper.Map<IEnumerable<AnnouncementViewDto>>(announcements);

            return Ok(response);
        }

        // GET api/<UserAnnouncementController>
        [HttpGet("GetFavoriteAnnouncementsId"), Authorize]
        public async Task<ActionResult<List<int>>> GetIds()
        {
            var user = await _repo.UserRepository.GetAuthorizedUser((ClaimsIdentity)User.Identity);
            var announcementsId = await _repo.UserAnnouncementRepository.GetAllFavAnnouncementIdsAsync(user.Id);

            return Ok(announcementsId);
        }

        // POST api/<UserAnnouncementController>
        [HttpPost("AddFavorite"), Authorize]
        public async Task<ActionResult> Post(IntClass request)
        {
            var user = await _repo.UserRepository.GetAuthorizedUser((ClaimsIdentity)User.Identity);
            var announcement = await _repo.AnnouncementRepository.GetByIdAsync(request.announcementId);

            if (user == null && announcement == null)
                return BadRequest("User or Announcement do not exist");

            var link = await _repo.UserAnnouncementRepository.GetByIdAsync(user.Id, announcement.Id);

            if (link == null)
            {
                _repo.UserAnnouncementRepository.Add(new UserAnnouncement { AnnouncementId = announcement.Id, UserId = user.Id, IsFavorite = true, Seen = false, IsOwner = false });
                await _repo.SaveAsync();
            }
            else
            {
                link.IsFavorite = true;
                await _repo.ModifyAndSaveAsync(link);
            }
           

            return Ok();
        }

        // DELETE api/<UserAnnouncementController>/5
        [HttpDelete("RemoveFavorite"), Authorize]
        public async Task<ActionResult> Delete(IntClass request)
        {
            var user = await _repo.UserRepository.GetAuthorizedUser((ClaimsIdentity)User.Identity);
            var announcement = await _repo.AnnouncementRepository.GetByIdAsync(request.announcementId);

            if (user == null && announcement == null)
                return BadRequest("User or Announcement do not exist");

            var item = await _repo.UserAnnouncementRepository.GetByIdAsync(user.Id, announcement.Id);

            if(item == null)
                return BadRequest("Do not exist");

            item.IsFavorite = false;
            await _repo.ModifyAndSaveAsync(item);


            return Ok();
        }

        [HttpPost("AddSeenAnnouncement"), Authorize]
        public async Task<ActionResult> AddSeenAnnouncement(IntClass request)
        {
            var user = await _repo.UserRepository.GetAuthorizedUser((ClaimsIdentity)User.Identity);
            var announcement = await _repo.AnnouncementRepository.GetByIdAsync(request.announcementId);

            if (user == null && announcement == null)
                return BadRequest("User or Announcement do not exist");

            var link = await _repo.UserAnnouncementRepository.GetByIdAsync(user.Id, announcement.Id);

            if (link == null)
            {
                _repo.UserAnnouncementRepository.Add(new UserAnnouncement { AnnouncementId = announcement.Id, UserId = user.Id, Seen = true,  IsFavorite = false, IsOwner = false });
                await _repo.SaveAsync();
            }
            else
            {
                link.Seen = true;
                await _repo.ModifyAndSaveAsync(link);
            }

            var numbers = await _repo.UserAnnouncementRepository.GetAnnouncementViewNumberByAnnId(announcement.Id);

            return Ok(numbers);
        }


        [HttpPost("GetViews")]
        public async Task<ActionResult> GetViews(IntClass request)
        {
            var announcement = await _repo.AnnouncementRepository.GetByIdAsync(request.announcementId);

            if (announcement == null)
                return BadRequest("User or Announcement do not exist");

            var numbers = await _repo.UserAnnouncementRepository.GetAllFavAnnouncementIdsAsync(announcement.Id);

            return Ok(numbers);
        }

        [HttpGet("GetAnnouncementOwner")]
        public async Task<ActionResult> GetOwner(int id)
        {
            var userId = await _repo.UserAnnouncementRepository.GetUserByAnnouncementIdAsync(id);

            if (userId == null)
                return BadRequest("User or Announcement do not exist");

            return Ok(userId);
        }
    }
}
