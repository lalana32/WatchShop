using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _authService;
        private readonly UserManager<User> _userManager;
        private readonly DataContext _context;

        public AuthController(IAuthService authService, UserManager<User> userManager, DataContext context)
        {
            _authService = authService;
            _userManager = userManager;
            _context = context;
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

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<LoginDto>> GetCurrentUser()
        {
            
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            if (user == null) return NotFound();

             var cart = await _context.Carts.Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product).FirstOrDefaultAsync(c => c.BuyerId == user.Id);

            var token = _authService.CreateToken(user);

            return new LoginDto
            {
                Username = user.UserName,
                Id = user.Id,
                Email = user.Email,
                Cart =  cart,
                Token = token,
            };
        }

    }   

}
