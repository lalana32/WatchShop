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
        public async Task<ActionResult<List<GetProductDto>>> GetProducts()
        {
            var productList = await _context.Products.ToListAsync();
            var products = productList.Select(product => _mapper.Map<GetProductDto>(product)).ToList();
            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetProductDto>> GetProductById(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            var mappedProduct = _mapper.Map<GetProductDto>(product);
            return mappedProduct!;
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
    }
}