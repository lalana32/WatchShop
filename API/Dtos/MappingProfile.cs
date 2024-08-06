using API.Models;
using AutoMapper;

namespace API.Dtos
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product, GetProductDto>();
            CreateMap<CreateProductDto, Product>();
            CreateMap<UpdateProductDto, Product>();
            CreateMap<ProductFilteredDto, GetProductDto>();
            CreateMap(typeof(PagedResult<>), typeof(PagedResult<>));
            
        }
    }
}