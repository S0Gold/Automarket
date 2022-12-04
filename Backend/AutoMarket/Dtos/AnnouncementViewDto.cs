using AutoMarket.Models;

namespace AutoMarket.Dtos
{
    public class AnnouncementViewDto
    {
        public int Id { get; set; }
        public string? VIN { get; set; } = String.Empty;
        public int CarId { get; set; }
        public string Brand { get; set; } = String.Empty;
        public string Model { get; set; } = String.Empty;
        public string Body { get; set; } = String.Empty;
        public int Year { get; set; }
        public int Price { get; set; }
        public int Km { get; set; }
        public int HP { get; set; }
        public string Fuel { get; set; } = String.Empty;
        public Decimal CilindricalCapacity { get; set; }
        public string Pollution { get; set; } = String.Empty;
        public string Color { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        public List<string>? Options { get; set; }
        public string County { get; set; } = String.Empty;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public List<PhotoDto>? Photos { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}
