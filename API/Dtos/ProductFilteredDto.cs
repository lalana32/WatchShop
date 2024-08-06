namespace API.Dtos
{
    public class ProductFilteredDto
    {
        public List<string> Brands { get; set; } = new List<string>();
        public string? Sex { get; set; }
        public string? SortBy { get; set; } = string.Empty;
        public int Page { get; set; } = 1; 
        public int PageSize { get; set; }
    }
}