
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoMarket.Models
{
    public class Announcement
    {
        [Key]
        public int Id { get; set; }

        public string VIN { get; set; } = String.Empty;

        public int CarId { get; set; }

        [ForeignKey(nameof(CarId))]
        public virtual Car Car { get; set; }

        public string Fuel { get; set; } = String.Empty;

        public int Price { get; set; }

        public int Km { get; set; }

        public int HP { get; set; }

        public Decimal CilindricalCapacity { get; set; }

        public string Pollution { get; set; } = String.Empty;

        public string Color { get; set; }

        public string Description { get; set; } = String.Empty;

        public string Options { get; set; }

        public string Location { get; set; } = String.Empty;

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public DateTime RegistrationDate { get; set; }

        [InverseProperty(nameof(UserAnnouncement.Announcement))]
        public virtual List<UserAnnouncement>? Users { get; set; }

        [InverseProperty(nameof(Photo.Announcement))]
        public virtual List<Photo>? Photos { get; set; }




    }
}
