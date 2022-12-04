using AutoMapper;
using AutoMarket.Dtos;
using AutoMarket.Helpers;
using AutoMarket.Interfeces;
using AutoMarket.Models;
using AutoMarket.Process;
using IdentityServer3.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AutoMarket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        
        private readonly IUnitOfWork _repo;
        private readonly IConfiguration _configuration ;
        private readonly IMapper _mapper;

        public UserController(IUnitOfWork repo, IConfiguration configuration, IMapper mapper)
        {
            _repo = repo;
            _configuration = configuration;
            _mapper = mapper;
        }

        // POST: api/User/Register
        [HttpPost("Register")]
        public async Task<ActionResult<List<User>>> Register(UserRegisterDto request)
        {

            if (!UserValidation.IsValidEmail(request.EmailAddress))
                return BadRequest("Email is not valid.");

            if (!UserValidation.IsValidNumber(request.PhoneNumber))
                return BadRequest("Phone number is not valid.");

            var users = await _repo.UserRepository.UserExists(request.EmailAddress);

            if (users != null)
                return BadRequest("User deja existent");
   

            _repo.UserRepository.Register(request);
            await _repo.SaveAsync();

            return Ok(); 
           
        }

        // POST: api/User/Login
        [HttpPost("Login")]
        public async Task<ActionResult> Login(UserLoginDto request)
        {
            var user = await _repo.UserRepository.Authenticate(request);
            if (user == null)
                return BadRequest("User not found or password incorrect.");

            return Ok(new string[] { JWT.CreateToken(user, _configuration), user.FirstName });
        }

        // DELETE: api/User/DeleteUser
        [HttpDelete, Authorize]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _repo.UserRepository.GetAuthorizedUser((ClaimsIdentity)this.User.Identity);

            if (user == null)
                return NotFound();

            _repo.UserRepository.Remove(user);
            await _repo.SaveAsync();

            return NoContent();
        }

        // GET: api/User/GetUser
        [HttpGet("GetUser"), Authorize]
        public async Task<ActionResult<UserViewDto>> GetUser()
        {
            var user = await _repo.UserRepository.GetAuthorizedUser((ClaimsIdentity)User.Identity);
            if (user == null)
                return BadRequest("No Ideea LOL");

            var usetDto = _mapper.Map<UserViewDto>(user);

            return Ok(usetDto);
        }

        [HttpGet("GetUserById/{id}"), Authorize]
        public async Task<ActionResult<UserViewDto>> GetUserById(int id)
        {
            var user = await _repo.UserRepository.GetUser(id);
            if (user == null)
                return BadRequest("No Ideea LOL");

            var usetDto = _mapper.Map<UserViewDto>(user);

            return Ok(usetDto);
        }

        // GET: api/User/GetAllUsers
        [HttpGet("GetUsers"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<UserViewDto>>> GetAllUsers()
        {
             var user = await _repo.UserRepository.GetAuthorizedUser((ClaimsIdentity)User.Identity);
            if (user == null || user.Role != "Admin")
                return BadRequest("You don't have the rights");
         
            var users = await _repo.UserRepository.GetAllAsync();
            var usestDto = _mapper.Map<List<UserViewDto>>(users);
            return Ok(usestDto);
        }

        [HttpGet("SendRecoverEmail")]
        public async Task<IActionResult> SendRecoverEmail(string emailAddress)
        {
            if (!UserValidation.IsValidEmail(emailAddress))
                return BadRequest("Email is not valid.");

            var user = await _repo.UserRepository.UserExists(emailAddress);


            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefhgytulmsjhqolp";
            var verificationCode =  new string(Enumerable.Repeat(chars, 256).Select(s => s[random.Next(s.Length)]).ToArray());
            user.VerificationCode = verificationCode;
            user.VerificationCodeTime = DateTime.Now;

            _repo.ModifyAndSaveAsync(user);

            Email.SendRecoverAccountEmail(emailAddress, verificationCode);
                return Ok();
        }

        [HttpPost("RecoverEmail")]
        public async Task<IActionResult> RecoverPassword(UserNewPasswordDto request)
        {
            var user = await _repo.UserRepository.UserExists(request.EmailAddress);
            if (user == null)
                return BadRequest();


            if (request.OldPassword.Equals(user.VerificationCode) && (DateTime.Now - user.VerificationCodeTime).Minutes <= 5)
            {
                JWT.CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;

                try
                {
                    _repo.ModifyAndSaveAsync(user);
                }
                catch (DbUpdateConcurrencyException)
                {
                    return NotFound();
                }
            }
            
            return Ok();
        }

        [HttpPost("ChangePassword"), Authorize]
        public async Task<IActionResult> ChangePassword(UserNewPasswordDto request)
        {
            var user =await  _repo.UserRepository.GetAuthorizedUser((ClaimsIdentity)User.Identity);

            if (!JWT.VerifyPasswordHash(request.OldPassword, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Wrong old password.");
            }

            JWT.CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            try
            {
                _repo.ModifyAndSaveAsync(user);
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return NoContent();


        }

        // PUT: api/User/EditUser
        [HttpPut("EditUser"), Authorize]
        public async Task<ActionResult> EditUser(UserViewDto request)
        {
            var user = await _repo.UserRepository.GetAuthorizedUser((ClaimsIdentity)User.Identity);
            if (user == null)
                return BadRequest("No Ideea LOL");
            try
            {
                user.FirstName = request.FirstName;
                user.LastName = request.LastName;
                user.PhoneNumber = request.PhoneNumber;
                user.EmailAddress = request.EmailAddress;
                await _repo.ModifyAndSaveAsync(user);
                return Ok();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest(ex);
            }
           
        }

        // DELETE: api/User
        [HttpDelete("RemoveUser"), Authorize]
        public async Task<IActionResult> DeleteUser( )
        {
            var user = await _repo.UserRepository.GetAuthorizedUser((ClaimsIdentity)User.Identity);

            _repo.UserRepository.Remove(user);
            await _repo.SaveAsync();

            return Ok();
        }

        [HttpDelete("RemoveUserByAdmin/{id}"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteAnnouncement(int id)
        {
            var user = await _repo.UserRepository.GetUser(id);

            _repo.UserRepository.Remove(user);
            await _repo.SaveAsync();

            return Ok();
        }

        
        [HttpPost("SearchUsers"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> Search(UserSearchDto request)
        {
            var users = await _repo.UserRepository.Search(request);

            if (users == null) return BadRequest("No user found");
            var usestDto = _mapper.Map<List<UserViewDto>>(users);
            return Ok(usestDto);
        }
    }
}
