using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

using API.Data;
using API.Dtos;
using API.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class AuthService : IAuthService
    {

        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
       
        private readonly IConfiguration _config;

        public AuthService(DataContext context, UserManager<User> userManager, IConfiguration config)
        {
            _config = config;
            _userManager = userManager;
            _context = context;
        }



        public async Task<string> LoginUser(LoginUserDto loginUserDto)
        {

            var user = await _userManager.FindByNameAsync(loginUserDto.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginUserDto.Password))
            {
                return "Not valid username or password";
            }

            // Generisanje JWT tokena
           var response = CreateToken(user);
           return response;
            

        }

        

        public async Task<User> RegisterUser(RegisterUserDto registerUserDto)
        {
             try
            {
                var existingUser = await GetUserByUsername(registerUserDto.Username);
                if(existingUser != null)
                {
                    return null!;
                }
                
                var newUser = new User
                {
                    UserName = registerUserDto.Username,
                    Email = registerUserDto.Email,
                };

                await _userManager.CreateAsync(newUser, registerUserDto.Password);
                await _userManager.AddToRoleAsync(newUser, "Member");

                var cart = new Cart{BuyerId = newUser.Id};
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();

                return newUser;
                
            }
          
            catch (Exception ex)
            {
                
                return null!;
                
            }
        }




        private async Task<User> GetUserByUsername(string username)
                {
                    var user =  await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);
                    return user!;
                }


        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var appSettingsToken = _config.GetSection("AppSettings:Token").Value;
            if(appSettingsToken is null) throw new Exception("App settings token is null");


            SymmetricSecurityKey key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(appSettingsToken));

            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds,
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);

        }


        

    }
}
