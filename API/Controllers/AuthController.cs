using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterUserDto registerUserDto)
        {
             
           
            var result = await _authService.RegisterUser(registerUserDto);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("User registration failed");
            }

           
        }

       [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUserDto loginUserDto)
        {

           var result = await  _authService.LoginUser(loginUserDto);
           if(result is null) return Unauthorized();

           return Ok(result);


        }
    }   

}
