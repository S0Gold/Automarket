using System.ComponentModel.DataAnnotations;

namespace AutoMarket.Models
{
    public class Preferences
    {
        [Key]
        public int Id { get; set; }
        public string Brands { get; set; }
        public string Models { get; set; }
        public string Categories { get; set; }
        public string Years { get; set; } = String.Empty;
        public string Counties { get; set; }
        public int MinPrice { get; set; }
        public int MaxPrice { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
