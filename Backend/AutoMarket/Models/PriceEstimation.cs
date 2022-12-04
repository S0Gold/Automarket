using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoMarket.Models
{
    public class PriceEstimation
    {
        [Key]
        public int Id { get; set; }

        public int CarId { get; set; }

        [ForeignKey(nameof(CarId))]
        public virtual Car Car { get; set; }

        public string Fuel { get; set; } = String.Empty;

        public int Price { get; set; }

        public int Km { get; set; }

    }
}
