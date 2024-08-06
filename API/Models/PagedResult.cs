namespace API.Models
{
    public class PagedResult<T>
    {
        public List<T>? Products { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
    }
}