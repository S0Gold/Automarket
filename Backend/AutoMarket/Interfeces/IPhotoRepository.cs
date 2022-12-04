using AutoMarket.Models;
using CloudinaryDotNet.Actions;

namespace AutoMarket.Interfeces
{
    public interface IPhotoRepository
    {
        public void Add(ImageUploadResult result, Announcement announcement, Boolean isPrimary);
        public void Remove(Photo photo);
        Task<Photo> GetById(string id);
        Task<IEnumerable<Photo>> GetMultipleByAnnouncementId(int id);
        Task<ImageUploadResult> UploadAsync(IFormFile photo);
    }
}
