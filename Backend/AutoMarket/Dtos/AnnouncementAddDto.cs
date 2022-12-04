namespace AutoMarket.Dtos
{
    public class AnnouncementAddDto
    {
        public string? VIN { get; set; } = String.Empty;

        public string Brand { get; set; } = String.Empty;

        public string Model { get; set; } = String.Empty;

        public string Body { get; set; } = String.Empty;

        public int Year { get; set; }

        public int Price { get; set; }

        public string Fuel { get; set; } = String.Empty;

        public int Km { get; set; }

        public int HP { get; set; }

        public Decimal CilindricalCapacity { get; set; }

        public string Pollution { get; set; } = String.Empty;

        public string Color { get; set; } = String.Empty;

        public string Description { get; set; } = String.Empty;

        public string County { get; set; } = String.Empty;

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public List<string>? Options { get; set; }

    }
}
