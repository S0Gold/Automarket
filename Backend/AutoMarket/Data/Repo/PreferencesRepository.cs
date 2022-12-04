using AutoMarket.Interfeces;
using AutoMarket.Models;
using Microsoft.EntityFrameworkCore;

namespace AutoMarket.Data.Repo
{
    public class PreferencesRepository : IPreferencesRepository
    {
        private readonly DataContext _context;

        public PreferencesRepository(DataContext context)
        {
            _context = context;
        }
        public void Add(Preferences elem)
        {
            _context.Add(elem);
        }

        public void Edit(Preferences elem)
        {
            throw new NotImplementedException();
        }

        public async Task<Preferences> Get(User elem)
        {
            var response = await _context.Preferences.Where(i => i.UserId == elem.Id).FirstOrDefaultAsync();
            return response;
        }

        public void Remove(Preferences elem)
        {
            throw new NotImplementedException();
        }
    }
}
