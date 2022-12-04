namespace AutoMarket.Dtos
{
    public class PreferencesDto
    {
        public List<string> Brands { get; set; } 
        public List<string> Models { get; set; }
        public List<string> Bodies { get; set; }
        public List<int> Years { get; set; }
        public List<string> Counties { get; set; }
        public List<string> Pollutions { get; set; }
        public int MinKm { get; set; }
        public int MaxKm { get; set; }

    }
}
