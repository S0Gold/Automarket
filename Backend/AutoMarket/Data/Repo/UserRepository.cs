using AutoMarket.Dtos;
using AutoMarket.Interfeces;
using AutoMarket.Models;
using AutoMarket.Process;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Security.Cryptography;

namespace AutoMarket.Data.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<User> Authenticate(UserLoginDto request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.EmailAddress == request.EmailAddress);

            if (user == null) 
                return null;

            if (!JWT.VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        public void Register(UserRegisterDto request)
        {
            JWT.CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            User newUser = new User()
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                EmailAddress = request.EmailAddress,
                PhoneNumber = request.PhoneNumber,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Role = "User",
                RegistrationDate = DateTime.Now,
                VerificationCodeTime = DateTime.Now,
                VerificationCode = ""

            };

            _context.Users.Add(newUser);
        }
        public async void Remove(User user)
        {
            _context.Users.Remove(user);
        }
        public async Task<User> UserExists(string input)
        {
            var response = await _context.Users.FirstOrDefaultAsync(x => x.EmailAddress == input);
            return response;
        }

        public async Task<User> GetAuthorizedUser(ClaimsIdentity user)
        {
            var userMail = user.FindFirst(ClaimTypes.Email)?.Value;
            var response = await _context.Users.FirstOrDefaultAsync(x => x.EmailAddress.Equals(userMail));

            return response;
        }

        public async Task<User> GetUser(int id)
        {
            var res = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            return res;

        }
        public async Task<IEnumerable<User>> GetAllAsync()
        {
            var res = await _context.Users.Include(e => e.Announcements).ToListAsync(); 
            return res;

        }

        public async Task<IEnumerable<User>> Search(UserSearchDto request)
        {
            IEnumerable<User> dbResponse = new List<User>();

            if(request.EmailAddress != "")
            {
                dbResponse = await _context.Users.Where(x => x.EmailAddress == request.EmailAddress).ToListAsync();
                return dbResponse;
            }
               
            if (request.PhoneNumber != "")
            {
                dbResponse = await _context.Users.Where(x => x.PhoneNumber == request.PhoneNumber).ToListAsync();
                return dbResponse;
            }

            dbResponse = await _context.Users.ToListAsync();

            if (request.FirstName != "")
                dbResponse = dbResponse.Where(x => x.FirstName == request.FirstName);

            if (request.LastName != "")
            {
                dbResponse = dbResponse.Where(x => x.LastName == request.LastName);
            }
            return dbResponse;

        }
    }
}
