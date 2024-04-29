using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Models;

namespace API.Services
{
    public interface IAuthService
    {
        Task<User> RegisterUser(RegisterUserDto registerUserDto);
        Task<string> LoginUser(LoginUserDto loginUserDto);
    }
}