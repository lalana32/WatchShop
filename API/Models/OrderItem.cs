namespace API.Models
{
    public class OrderItem
    {
        public int Id { get; set;} 
        public int ProductId { get; set;}
        public string? Name { get; set;}
        public string? PictureUrl { get; set; }
        public long? Price { get; set; }

    }
}