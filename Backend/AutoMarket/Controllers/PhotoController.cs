using AutoMarket.Interfeces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AutoMarket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly IUnitOfWork _repo;

        public PhotoController(IUnitOfWork repo)
        {
             _repo = repo;

        }
        [HttpPost("UploadPhoto/{id}/{primaryIndex}"), Authorize]
        public async Task<IActionResult> AddPhoto(List<IFormFile> files, int id, int primaryIndex)
        {
            var announcement = await _repo.AnnouncementRepository.GetByIdAsync(id);
            int index = 0;
            foreach (var file in files)
            {
                var result = await _repo.PhotoRepository.UploadAsync(file);

                if (result.Error != null)
                    return BadRequest(result.Error.Message);

                _repo.PhotoRepository.Add(result, announcement, (index++ == primaryIndex));
                await _repo.SaveAsync();
            }
            
            return Ok(201);
        }

        [HttpPost("UpdatePhoto/{id}/{primaryIndex}"), Authorize]
        public async Task<IActionResult> UpdatePhoto(List<IFormFile> files, int id, int primaryIndex)
        {
                 
            var dbPhotos = await _repo.PhotoRepository.GetMultipleByAnnouncementId(id);
            foreach (var dbPhoto in dbPhotos)
            {
                if (files.FindIndex(x => x.FileName == dbPhoto.ImageUrl) == -1)
                {
                    _repo.PhotoRepository.Remove(dbPhoto);
                    await _repo.SaveAsync();
                }
            }

            var user = await _repo.UserRepository.GetAuthorizedUser((ClaimsIdentity)this.User.Identity);
            var announcement = await _repo.AnnouncementRepository.GetByIdAsync(id);
            int index = 0;

            foreach (var file in files)
            {
                var photo = announcement.Photos.Find(x => x.ImageUrl == file.FileName);
                if(photo != null) //Photo exist in our DB
                {
                    if(index == primaryIndex)
                    {
                        //Find last primary and remove primary atribute
                        var primaryPhoto = announcement.Photos.Find(x => x.IsPrimary == true);
                        if(primaryPhoto != null)
                        {
                            primaryPhoto.IsPrimary = false;
                            await _repo.ModifyAndSaveAsync(primaryPhoto);
                        }
                        //Set our new primary photo
                        photo.IsPrimary = true;
                        await _repo.ModifyAndSaveAsync(photo);
                    }
                }
                else //Photo do not exist in our DB
                {
                    var result = await _repo.PhotoRepository.UploadAsync(file);

                    if (result.Error != null)
                        return BadRequest(result.Error.Message);

                    _repo.PhotoRepository.Add(result, announcement, (index == primaryIndex));
                    await _repo.SaveAsync();
                }
                index++;
            }

           


            return Ok(201);
        }

        [HttpDelete("RemovePhotos/{announcementId}"), Authorize]
        public async Task<IActionResult> RemovePhotos(int announcementId)
        {

            var photos = await _repo.PhotoRepository.GetMultipleByAnnouncementId(announcementId);
            foreach (var photo in photos)
            {
                _repo.PhotoRepository.Remove(photo);
            }
            await _repo.SaveAsync();

            return Ok(201);
        }

        [HttpDelete("RemovePhoto/{publicId}"), Authorize]
        public async Task<IActionResult> RemovePhoto(string publicId)
        {
            var photo = await _repo.PhotoRepository.GetById(publicId);
            _repo.PhotoRepository.Remove(photo);
            await _repo.SaveAsync();

            return Ok(201);
        }

    }
}
