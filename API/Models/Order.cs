namespace API.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public string? UserId { get; set; }
        public List<OrderItem>? OrderItems { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
    }
}