using API.Models;

namespace API.Dtos
{
    public class CreateOrderDto
    {
        public string? UserId { get; set; }
        public List<OrderItem>? OrderItems { get; set; }
    }
}