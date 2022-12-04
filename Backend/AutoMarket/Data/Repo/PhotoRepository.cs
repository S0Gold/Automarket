using AutoMarket.Interfeces;
using AutoMarket.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.EntityFrameworkCore;

namespace AutoMarket.Data.Repo
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly Cloudinary _cloudinary;
        private readonly DataContext _context;
        public PhotoRepository(DataContext context, IConfiguration config)
        {
            _context = context;

            Account account = new Account(
                config.GetSection("CloudinarySettings:CloudName").Value,
                config.GetSection("CloudinarySettings:Key").Value,
                config.GetSection("CloudinarySettings:Secret").Value
            );
            _cloudinary = new Cloudinary(account);
        }

        public void Add(ImageUploadResult result, Announcement announcement, Boolean isPrimary)
        {
            var newPhoto = new Photo
            {
                ImageUrl = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                AnnouncementId = announcement.Id,
                IsPrimary = isPrimary
            };
            
            _context.Add(newPhoto);
        }

        public async Task<ImageUploadResult> UploadAsync(IFormFile photo)
        {
            var uploadResult = new ImageUploadResult();
            if (photo.Length > 0)
            {
                using var stream = photo.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(photo.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(800)
                };
                uploadResult = await _cloudinary.UploadAsync(uploadParams);
            }

            return uploadResult;
        }

        public void Remove(Photo photo)
        {
            _cloudinary.DeleteResourcesByPrefix(photo.PublicId);
            _context.Remove(photo);
        }

        public async Task<IEnumerable<Photo>> GetMultipleByAnnouncementId(int id)
        {
            var result = await _context.Photos.Where(x => x.AnnouncementId == id).ToListAsync();

            return result;
        }

        public async Task<Photo> GetById(string id)
        {
            var result = await _context.Photos.Where(x => x.PublicId == id).FirstOrDefaultAsync();

            return result;
        }


    }
}
