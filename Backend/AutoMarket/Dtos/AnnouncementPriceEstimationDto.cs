namespace AutoMarket.Dtos
{
    public class AnnouncementPriceEstimationDto
    {
        public int CarId { get; set; }
        public int Km { get; set; }
        public int Price { get; set; }
        public string Fuel { get; set; } = string.Empty;
    }
}
