using AutoMarket.Models;

namespace AutoMarket.Interfeces
{
    public interface IPreferencesRepository
    {
        public void Add(Preferences elem);
        public void Edit(Preferences elem);
        public Task<Preferences> Get(User elem);
        public void Remove(Preferences elem);
    }
}
