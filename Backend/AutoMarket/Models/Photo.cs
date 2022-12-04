using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoMarket.Models
{
    public class Photo
    {
        [Required, Key]
        public string PublicId { get; set; }
        [Required]
        public string ImageUrl { get; set; } = string.Empty;

        public bool IsPrimary { get; set; }

        public int AnnouncementId { get; set; }

        [ForeignKey(nameof(AnnouncementId))]
        public virtual Announcement Announcement { get; set; }
    }
}
