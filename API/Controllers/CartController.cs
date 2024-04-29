using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
     
    public class CartController : ControllerBase
    {
       
        private readonly DataContext _context;
        public CartController(DataContext context)
        {
           _context = context;
            
        }

        [HttpGet("Get-cart")]
        public async Task<ActionResult<Cart>> GetCart()
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null) return Unauthorized("User is not authenticated.");
           

            var cart = await _context.Carts.Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product).FirstOrDefaultAsync(c => c.BuyerId == userId);

            if (cart == null)
            {
                return NotFound("Cart is null");
            }

            return Ok(cart);
        }

        [HttpPost("Add-item-to-cart")]
        public async Task<ActionResult<Cart>> AddItemToCart(int productId)
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var cart = await _context.Carts.Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product).FirstOrDefaultAsync(c => c.BuyerId == userId);

            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == productId);
            if(product is null) return NotFound("Product not found");

            var cartItem = new CartItem
            {
                ProductId = productId,
                Product = product,
                CartId = cart!.Id,
            };

            cart.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();
            return cart;
        }

        [HttpDelete("Remove-item-from-cart")]
        public async Task<ActionResult<List<CartItem>>> RemoveItemFromCart(int cartItemId)
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var cart = await _context.Carts.Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product).FirstOrDefaultAsync(c => c.BuyerId == userId);

            var cartItem = cart!.CartItems.FirstOrDefault(ci => ci.ProductId == cartItemId);

            cart.CartItems.Remove(cartItem!);
            await _context.SaveChangesAsync();
            return cart.CartItems;
        }
    }
}