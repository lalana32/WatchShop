namespace API.Dtos
{
    public class CreateProductDto
    {
        public string? Name { get; set; }
        public string? Brand { get; set; }
        public string? Description { get; set; }
        public long? Price { get; set; }
        public IFormFile? Picture { get; set; }
        public string? Sex { get; set; }
    }
}