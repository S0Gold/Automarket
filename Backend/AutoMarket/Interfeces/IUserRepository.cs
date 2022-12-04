using AutoMarket.Dtos;
using AutoMarket.Models;
using System.Security.Claims;

namespace AutoMarket.Interfeces
{
    public interface IUserRepository
    {
        void Register(UserRegisterDto request);
        public void Remove(User user);
        Task<User> Authenticate(UserLoginDto request);
        Task<User> UserExists(string userName);
        Task<User> GetAuthorizedUser(ClaimsIdentity user);

        Task<User> GetUser(int id);
        Task<IEnumerable<User>> GetAllAsync();

        Task<IEnumerable<User>> Search(UserSearchDto request);
    }
}
