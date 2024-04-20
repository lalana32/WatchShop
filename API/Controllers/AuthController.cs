// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using API.Services;
// using Microsoft.AspNetCore.Mvc;

// namespace API.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class AuthController : ControllerBase
//     {

//         private readonly IAuthService _authService;

//         public AuthController(IAuthService authService)
//         {
//             _authService = authService;
//         }

//         [HttpPost("register")]
//         public async Task<IActionResult> Register([FromBody] RegisterRequest model)
//         {
//             // Validacija modela
//             if (!ModelState.IsValid)
//             {
//                 return BadRequest(ModelState);
//             }

//             // Registracija korisnika
//             var result = await _authService.RegisterAsync(model);

//             if (!result.Success)
//             {
//                 return BadRequest(result.Message);
//             }

//             return Ok(result.Data);
//         }

//         [HttpPost("login")]
//         public async Task<IActionResult> Login([FromBody] LoginRequest model)
//         {
//             // Validacija modela
//             if (!ModelState.IsValid)
//             {
//                 return BadRequest(ModelState);
//             }

//             // Prijava korisnika
//             var result = await _authService.LoginAsync(model);

//             if (!result.Success)
//             {
//                 return Unauthorized(result.Message);
//             }

//             return Ok(result.Data);
//         }
//     }   

// }
