namespace AutoMarket.Interfeces
{
    public interface IUnitOfWork
    {
        IAnnouncementRepository AnnouncementRepository { get; }
        IUserRepository UserRepository { get; }
        IUserAnnouncementRepository UserAnnouncementRepository { get; }
        ICarRepository CarRepository { get; }
        IPhotoRepository PhotoRepository { get; }
        IPreferencesRepository PreferencesRepository { get; }
        IPriceEstimationRepository PriceEstimationRepository { get; }
        Task<bool> SaveAsync();
        Task<bool> ModifyAndSaveAsync(params object[] request);
    }
}
