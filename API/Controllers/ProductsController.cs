using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

            // Filtriranje po brendovima
            if (filters.Brands != null && filters.Brands.Any())
            {
                var brandFilters = filters.Brands.Select(b => b.ToLower()).ToList();
                query = query.Where(p => brandFilters.Contains(p.Brand!.ToLower()));
            }

            // Filtriranje po sex
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
                        // Podrazumevano sortiranje (ako postoji)
                        break;
                }
            }

            var totalProducts = await query.CountAsync();

            filters.Page = filters.Page > 0 ? filters.Page : 1;
            filters.PageSize = 6;

            var products = await query.Skip((filters.Page - 1)* filters.PageSize).Take(filters.PageSize).ToListAsync();

            var totalPages = (int)Math.Ceiling(totalProducts/(double)filters.PageSize);

            // Preuzmi filtrirane proizvode


            
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

        // [HttpPost]
        // public ActionResult<List<GetProductDto>> AddProduct(CreateProductDto newProductDto)
        // {
        //     var product = _mapper.Map<Product>(newProductDto);
        //     products.Add(product);
        //     return Ok(products);
        // }

        // [HttpPut]
        // public ActionResult<GetProductDto> UpdateProduct(UpdateProductDto updatedProduct)
        // {
        //     var selectedProduct = products.FirstOrDefault(x => x.Id == updatedProduct.Id);
        //     if (selectedProduct == null) return NotFound();

        //     selectedProduct.Name = updatedProduct.Name;
        //     selectedProduct.Brand = updatedProduct.Brand;
        //     selectedProduct.Sex = updatedProduct.Sex;

        //     return Ok(selectedProduct);
        // }

        // [HttpDelete("{id}")] 
        // public ActionResult DeleteProduct(int id)
        // {
        //     var selectedProduct = products.FirstOrDefault(x => x.Id == id);
        //     if(selectedProduct == null) return NotFound();

        //     products.Remove(selectedProduct);
        //     return Ok();    

        // }


        // [HttpGet("filtered")]
        // public async Task<ActionResult<List<GetProductDto>>> GetFilteredProducts([FromQuery] ProductFilteredDto filter)
        // {
        //     var products = _context.Products.Where(p => p.Brand == filter.Brand).ToList();

        //     return Ok(products);
        // } 
    }
}