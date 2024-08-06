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
    public class OrderController : ControllerBase{

    private readonly DataContext _context;
    public OrderController(DataContext context)
    {
        _context = context;
    }



        [HttpGet("getOrders")] 
        public async Task<ActionResult<List<Order>>> GetOrders([FromQuery] string userId)
        {


            var orders = await _context.Orders.Where(o => o.UserId == userId).Include(o => o.OrderItems).ToListAsync();
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrderById(int id)
        {
            var order = await _context.Orders.Include(o => o.OrderItems).FirstOrDefaultAsync(o => o.OrderId == id);
            return Ok(order);
        }
    
        [HttpPost("createOrder")]
        public async Task<ActionResult<Order>> CreateOrder ([FromQuery] string userId)
        {

            var cart = await _context.Carts.Include(c => c.CartItems!).ThenInclude(ci => ci.Product)
            .FirstOrDefaultAsync(c => c.BuyerId == userId);

            if (cart == null) return BadRequest("ne valja");

            
            var order = new Order
            {
                UserId = userId,
                OrderDate = DateTime.Now,
                 OrderItems = cart.CartItems!.Select(item => new OrderItem
                {
                    ProductId = item.ProductId,
                    PictureUrl = item.Product!.PictureUrl!, 
                    Name = item.Product.Name!, 
                    Price = item.Product.Price 
                }).ToList()
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            cart.CartItems!.Clear();
            await _context.SaveChangesAsync();


            return Ok(order);
         }
    }
}