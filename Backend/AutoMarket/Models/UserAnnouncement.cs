using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoMarket.Models
{
    public class UserAnnouncement
    {

        /*******************************************************/
        /*******************ONE-TO-MANY*************************/
        /*******************************************************/
        public int UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        /*******************************************************/
        /*******************ONE-TO-MANY*************************/
        /*******************************************************/
        public int AnnouncementId { get; set; }

        [ForeignKey(nameof(AnnouncementId))]
        public Announcement Announcement { get; set; }
        

        /*******************************************************/
        /*******************************************************/
        /*******************************************************/
        public Boolean IsOwner { get; set; }

        public Boolean IsFavorite { get; set; }

        public Boolean Seen { get; set; }

    }
}
