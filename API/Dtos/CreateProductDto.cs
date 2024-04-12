using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class CreateProductDto
    {
        public string Name { get; set; }
        public string Brand { get; set; }
        public string? Description { get; set; }
        public long? Price { get; set; }
        public string? PictureUrl { get; set; }
        public string Sex { get; set; }
    }
}