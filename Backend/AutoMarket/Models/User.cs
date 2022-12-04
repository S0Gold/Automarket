using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace AutoMarket.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string FirstName { get; set; } = string.Empty;

        [Column(TypeName = "varchar(50)")]
        public string LastName { get; set; } = string.Empty;

        [Column(TypeName = "varchar(50)")]
        public string EmailAddress { get; set; } = string.Empty;

        [Column(TypeName = "varchar(10)")]
        public string PhoneNumber { get; set; } = string.Empty;

        [Column(TypeName = "varchar(512)")]
        public byte[] PasswordHash { get; set; }

        [Column(TypeName = "varchar(512)")]
        public byte[] PasswordSalt { get; set; }

        [Column(TypeName = "varchar(25)")]
        public string Role { get; set; }

        [Column(TypeName = "varchar(256)")]
        public string? VerificationCode { get; set; }

        public DateTime VerificationCodeTime { get; set; }

        public DateTime RegistrationDate { get; set; }

        [InverseProperty(nameof(UserAnnouncement.User))]
        public virtual List<UserAnnouncement>? Announcements { get; set; }

    }
}
