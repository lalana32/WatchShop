using API.Data;
using API.Dtos;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public ProductsController(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PagedResult<GetProductDto>>> GetProducts([FromQuery] ProductFilteredDto filters)
        {
            var query = _context.Products.AsQueryable();

            
            if (filters.Brands != null && filters.Brands.Any())
            {
                var brandFilters = filters.Brands.Select(b => b.ToLower()).ToList();
                query = query.Where(p => brandFilters.Contains(p.Brand!.ToLower()));
            }

          
            if (!string.IsNullOrEmpty(filters.Sex))
            {
                string sexFilter = filters.Sex.ToLower();
                query = query.Where(p => p.Sex!.ToLower() == sexFilter);
            }

            if (!string.IsNullOrEmpty(filters.SortBy))
            {
                switch (filters.SortBy.ToLower())
                {
                    case "price_asc":
                        query = query.OrderBy(p => p.Price);
                        break;
                    case "price_desc":
                        query = query.OrderByDescending(p => p.Price);
                        break;
                    case "name":
                        query = query.OrderBy(p => p.Name);
                        break;
                    default:
                        break;
                }
            }

            var totalProducts = await query.CountAsync();

            filters.Page = filters.Page > 0 ? filters.Page : 1;
            filters.PageSize = 6;

            var products = await query.Skip((filters.Page - 1)* filters.PageSize).Take(filters.PageSize).ToListAsync();

            var totalPages = (int)Math.Ceiling(totalProducts/(double)filters.PageSize);

           


            
           var productDtos = _mapper.Map<List<GetProductDto>>(products);

            var pagedResult = new PagedResult<GetProductDto>
            {
                Products = productDtos,
                TotalCount = totalProducts,
                TotalPages = (int)Math.Ceiling((double)totalProducts / filters.PageSize),
                CurrentPage = filters.Page,
                PageSize = filters.PageSize
            };

            return Ok(pagedResult);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<GetProductDto>> GetProductById(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            var mappedProduct = _mapper.Map<GetProductDto>(product);
            return mappedProduct!;
        }

        [HttpGet("getBrands")]
        public async Task<ActionResult<List<string>>> GetBrands()
        {
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            return Ok(brands);
        }

        [HttpPost]
        public async Task<ActionResult<GetProductDto>> AddProduct([FromForm] CreateProductDto newProductDto)
        {
            if (newProductDto.Picture != null && newProductDto.Picture.Length > 0)
            {
              
                var folderPath = Path.Combine("wwwroot", "images");
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

               
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(newProductDto.Picture.FileName);
                var filePath = Path.Combine(folderPath, fileName);

          
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await newProductDto.Picture.CopyToAsync(stream);
                }

             
                var product = _mapper.Map<Product>(newProductDto);
                var request = HttpContext.Request;
                var baseUrl = $"{request.Scheme}://{request.Host}{request.PathBase}";
                product.PictureUrl = Path.Combine(baseUrl, "images", fileName).Replace("\\", "/");

                await _context.Products.AddAsync(product);
                await _context.SaveChangesAsync();

                var productDto = _mapper.Map<GetProductDto>(product);
                return Ok(productDto);
            }

            return BadRequest("No picture uploaded.");
        }

       

        [HttpDelete("{id}")] 
        public async Task<ActionResult> DeleteProduct(int id)
        {
           var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);

           if (product == null)
            {
                return NotFound();
            }

           _context.Products.Remove(product);    

           await _context.SaveChangesAsync();

           return Ok();
        }

    }
}