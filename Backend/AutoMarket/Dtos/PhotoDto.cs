namespace AutoMarket.Dtos
{
    public class PhotoDto
    {
        public string PublicId { get; set; }

        public string ImageUrl { get; set; } = string.Empty;

        public bool IsPrimary { get; set; }

        public int AnnouncementId { get; set; }
    }
}
