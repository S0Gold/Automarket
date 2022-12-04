using Microsoft.EntityFrameworkCore;

namespace AutoMarket.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)   {  }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserAnnouncement>()
                .HasKey(bc => new { bc.UserId, bc.AnnouncementId });

            modelBuilder.Entity<UserAnnouncement>()
                .HasOne(bc => bc.User)
                .WithMany(b => b.Announcements)
                .HasForeignKey(bc => bc.UserId);

            modelBuilder.Entity<UserAnnouncement>()
                .HasOne(bc => bc.Announcement)
                .WithMany(c => c.Users)
                .HasForeignKey(bc => bc.AnnouncementId);
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<UserAnnouncement> UserAnnouncements { get; set; }
        public DbSet<Preferences> Preferences { get; set; }
        public DbSet<PriceEstimation> PriceEstimations { get; set; }
    }
}
