// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using API.AuthHelper;
// using API.Data;
// using API.Dtos;
// using API.Models;
// using Microsoft.AspNetCore.Authentication;
// using Microsoft.EntityFrameworkCore;

// namespace API.Services
// {
//     public class AuthService : IAuthService
//     {

//         private readonly DataContext _context;

//         public AuthService(DataContext context)
//         {
//             _context = context;
//         }



//         public Task<AuthService> LoginUser(LoginUserDto loginUserDto)
//         {
//             throw new NotImplementedException();
//         }

//         public async Task<AuthResult> RegisterUser(RegisterUserDto registerUserDto)
//         {
//             try
//             {
//                 var existingUser = await GetUserByUsernameOrEmail(registerUserDto.Email, registerUserDto.Username);
//                 if(existingUser != null)
//                 {
//                     return new AuthResult{ Success = false, Message = "User with the provided username or email already exists" };
//                 }

//                 var newUser = new User
//                 {
//                     UserName = registerUserDto.Username,
//                     Email = registerUserDto.Email,
//                     PasswordHash = registerUserDto.Password,
//                 }
//             }
          
//             catch (Exception ex)
//             {
                
                
//             }
//         }
        


//         private async Task<User> GetUserByUsernameOrEmail(string username, string email)
//         {
//             var user =  await _context.Users.FirstOrDefaultAsync(u => u.Username == username || u.Email == email);
//             return user;
//         }
    
// }
// }
