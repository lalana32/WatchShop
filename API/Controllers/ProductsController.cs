// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using API.Dtos;
// using API.Models;
// using AutoMapper;
// using Microsoft.AspNetCore.Mvc;

// namespace API.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class ProductsController : ControllerBase
//     {
        
//         private readonly IMapper _mapper;

//         public ProductsController(IMapper mapper)
//         {
//             _mapper = mapper;
//         }

//         [HttpGet]
//         public ActionResult<List<GetProductDto>> GetProducts()
//         {
//             return Ok(products);
//         }

//         [HttpGet("{id}")]
//         public ActionResult<List<GetProductDto>> GetProductById(int id)
//         {
//             var product = products.FirstOrDefault(x => x.Id == id);
//             return Ok(product);
//         }

//         [HttpPost]
//         public ActionResult<List<GetProductDto>> AddProduct(CreateProductDto newProductDto)
//         {
//             var product = _mapper.Map<Product>(newProductDto);
//             products.Add(product);
//             return Ok(products);
//         }

//         [HttpPut]
//         public ActionResult<GetProductDto> UpdateProduct(UpdateProductDto updatedProduct)
//         {
//             var selectedProduct = products.FirstOrDefault(x => x.Id == updatedProduct.Id);
//             if (selectedProduct == null) return NotFound();

//             selectedProduct.Name = updatedProduct.Name;
//             selectedProduct.Brand = updatedProduct.Brand;
//             selectedProduct.Sex = updatedProduct.Sex;

//             return Ok(selectedProduct);
//         }

//         [HttpDelete("{id}")] 
//         public ActionResult DeleteProduct(int id)
//         {
//             var selectedProduct = products.FirstOrDefault(x => x.Id == id);
//             if(selectedProduct == null) return NotFound();

//             products.Remove(selectedProduct);
//             return Ok();    

//         }
//     }
// }