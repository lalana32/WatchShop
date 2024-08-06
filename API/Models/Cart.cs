namespace API.Models
{
    public class Cart
    {
        public int Id { get; set; } 
        public string? BuyerId { get; set; } 
        public List<CartItem>? CartItems { get; set; } 
    
    }
}