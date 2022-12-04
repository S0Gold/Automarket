namespace AutoMarket.Dtos
{
    public class SearchDto
    {
        public string Brand { get; set; } = String.Empty;

        public string Model { get; set; } = String.Empty;

        public string Body { get; set; } = String.Empty;

        public int Year { get; set; }

        public int MinPrice { get; set; }

        public int MaxPrice { get; set; }

        public string Fuel { get; set; } = String.Empty;

        public string County { get; set; } = String.Empty;
    }
}