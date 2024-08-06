using API.Models;

namespace API.Dtos
{
    public class LoginDto
    {
        public string? Id { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Token { get; set; }
        public Cart? Cart { get; set; }
        public List<string>? Roles { get; set; }
    }
}