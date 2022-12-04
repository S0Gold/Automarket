using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoMarket.Models
{
    public class Car
    {
        [Key]
        public int Id { get; set; }

        [InverseProperty(nameof(Announcement.Car))]
        public virtual List<Announcement>? Announcements { get; set;}

        public string Brand { get; set; } = String.Empty;

        public string Model { get; set; } = String.Empty;

        public string Body { get; set; } = String.Empty;

        public int Year { get; set; }


    }
}
