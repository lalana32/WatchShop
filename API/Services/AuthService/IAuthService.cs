using API.Dtos;
using API.Models;

namespace API.Services
{
    public interface IAuthService
    {
        Task<User> RegisterUser(RegisterUserDto registerUserDto);
        Task<LoginDto> LoginUser(LoginUserDto loginUserDto);
        Task<string> CreateToken(User user);
    }
}