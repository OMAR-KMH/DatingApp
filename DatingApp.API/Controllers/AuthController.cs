using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers {
    [Route ("api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public AuthController (IAuthRepository repo, IConfiguration config) {
            _config = config;
            _repo = repo;

        }

        [HttpPost ("register")]
        public async Task<IActionResult> Rigister (UserToRegisterDto UserToRegisterDto) {

            // if(!ModelState.IsValid)
            // return BadRequest(ModelState);
            UserToRegisterDto.Username = UserToRegisterDto.Username.ToLower ();

            if (await _repo.UserExists (UserToRegisterDto.Username))
                return BadRequest ("Username already exists ");

            var userToCreat = new User { userName = UserToRegisterDto.Username };

            var createdUser = await _repo.Rigister (userToCreat, UserToRegisterDto.Password);

            return StatusCode (201);

        }

        [HttpPost ("Login")]

        public async Task<IActionResult> Login (UserForLoginDtos userForLogin) {

            var userForRepo = await _repo.Login (userForLogin.Username.ToLower (), userForLogin.Password);

            if (userForRepo == null)
                return Unauthorized ();

            //create claims from IdUser And NameUser 
            var claims = new [] {
                new Claim (ClaimTypes.NameIdentifier, userForRepo.Id.ToString ()),
                new Claim (ClaimTypes.Name, userForRepo.userName)
            };

            //Generate Key For create credencials 
            var key = new SymmetricSecurityKey (Encoding.UTF8
                .GetBytes (_config.GetSection ("AppSettings:Token").Value));

            var creds = new SigningCredentials (key, SecurityAlgorithms.HmacSha512Signature);

            // create description gor tokens 
            var tokenDescriptor = new SecurityTokenDescriptor {

                Subject = new ClaimsIdentity (claims),
                Expires = DateTime.Now.AddDays (1),
                SigningCredentials = creds

            };
            //create the token for the  client
            var tokenHandler = new JwtSecurityTokenHandler ();
            var token = tokenHandler.CreateToken (tokenDescriptor);
            return Ok (
                new {

                    token = tokenHandler.WriteToken (token)
                }

            );

        }

    }
}