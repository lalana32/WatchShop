using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.AuthHelper;
using API.Data;
using API.Dtos;
using API.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class AuthService : IAuthService
    {

        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;

        public AuthService(DataContext context, UserManager<User> userManager)
        {
            _userManager = userManager;
            _context = context;
        }



        public Task<User> LoginUser(LoginUserDto loginUserDto)
        {
            throw new NotImplementedException();
        }

        
        


        private async Task<User> GetUserByUsernameOrEmail(string username, string email)
        {
            var user =  await _context.Users.FirstOrDefaultAsync(u => u.UserName == username || u.Email == email);
            return user!;
        }

        public async Task<User> RegisterUser(RegisterUserDto registerUserDto)
        {
             try
            {
                var existingUser = await GetUserByUsernameOrEmail(registerUserDto.Email, registerUserDto.Username);
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

                return newUser;
                
            }
          
            catch (Exception ex)
            {
                
                return null!;
                
            }
        }
    }
}
