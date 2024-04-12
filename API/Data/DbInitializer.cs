using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Data
{
    public class DbInitializer
    {
        public static void Initialize(DataContext context)
        {
            if (context.Products.Any())
            {
                return;   // Baza je već inicijalizovana
            }


            var products = new Product[]
            {
                new Product
{
   
	Name = "Calvin Klein Gold",
	Description = "Elegance meets functionality in this stunning women's watch. Featuring a sleek design with a mother-of-pearl dial and Swarovski crystal accents, this timepiece effortlessly combines style and sophistication.",
	Price = 17000,
	PictureUrl = "ladies-ck-gold.jpg",
	Brand = "Calvin Klein",
	Sex = "Female",
},

new Product
{
	Name = "Calvin Klein Minimalist",
	Description = "Add a touch of glamour to your wrist with this exquisite rose gold-tone watch. Adorned with sparkling diamonds and a delicate mesh bracelet, this timepiece is perfect for both formal occasions and everyday elegance.",
	Price = 20000,
	PictureUrl = "ladies-ck-minimalist.jpg",
	Brand = "Calvin Klein",
	Sex = "Female",
},

new Product
{
	Name = "Calvin Klein Pink",
	Description = "Make a bold statement with this chic oversized watch. With its striking design and vibrant color accents, this watch is sure to turn heads wherever you go, while its durable construction ensures long-lasting wear.",
	Price = 18000,
	PictureUrl = "ladies-ck-pink.jpg",
	Brand = "Calvin Klein",
	Sex = "Female",
},
new Product
{
	Name = "Emporio Armani Crystal",
	Description = "Embrace timeless elegance with this classic two-tone watch. Featuring a sophisticated combination of stainless steel and gold-tone accents, this watch exudes refined charm and versatility, making it a must-have accessory for any wardrobe.",
	Price = 30000,
	PictureUrl = "ladies-emporio-armani-crystal.jpg",
	Brand = "Emporio Armani",
	Sex = "Female",
},
new Product
{
	Name = "Emporio Armani Green",
	Description = "Experience luxury at its finest with this stunning automatic watch. Crafted with precision and attention to detail, this timepiece boasts a skeleton dial and exhibition caseback, allowing you to admire the intricate inner workings of the watch.",
	Price = 35000,
	PictureUrl = "ladies-emporio-armani-green.jpg",
	Brand = "Emporio Armani",
	Sex = "Female",
},
new Product
{
	Name = "Emporio Armani Snake",
	Description = "Stay on-trend with this modern minimalist watch. With its clean lines and understated design, this watch offers effortless style and sophistication, perfect for those who appreciate contemporary elegance.",
	Price = 28000,
	PictureUrl = "ladies-emporio-armani-snake.jpg",
	Brand = "Emporio Armani",
	Sex = "Female",
},
new Product
{
	Name = "Fossil Carlie",
	Description = "Channel vintage glamour with this retro-inspired watch. Featuring a nostalgic design with a leather strap and retro dial, this watch adds a touch of old-world charm to any outfit, making it a timeless accessory for any occasion.",
	Price = 14000,
	PictureUrl = "ladies-fossil-carlie.jpg",
	Brand = "Fossil",
	Sex = "Female",
},
new Product
{
	Name = "Fossil Raquel",
	Description = "Elevate your look with this glamorous chronograph watch. With its multifunctional design and dazzling crystal accents, this watch combines practicality with opulent style, making it a statement piece for the modern woman.",
	Price = 19000,
	PictureUrl = "ladies-fossil-raquel.jpg",
	Brand = "Fossil",
	Sex = "Female",
},
new Product
{
	Name = "Fossil Scarlette",
	Description = "Stay chic and organized with this elegant watch and jewelry set. Complete with interchangeable straps and coordinating bracelets, this set offers endless styling options, ensuring you're always perfectly accessorized.",
	Price = 20000,
	PictureUrl = "ladies-fossil-scarlette.jpg",
	Brand = "Fossil",
	Sex = "Female",
},
new Product
{
	Name = "Guess Bellini",
	Description = "Inspired by the beauty of nature, this floral-printed watch brings a touch of femininity to any ensemble. Featuring a delicate floral motif and pastel hues, this watch adds a whimsical charm to your wrist.",
	Price = 23000,
	PictureUrl = "ladies-guess-bellini.jpg",
	Brand = "Guess",
	Sex = "Female",
},
new Product
{
	Name = "Guess Cascade",
	Description = "Unleash your inner adventurer with this rugged yet stylish sports watch. Built for durability and performance, this watch features a robust design with water resistance and a built-in compass, making it ideal for outdoor enthusiasts.",
	Price = 18500,
	PictureUrl = "ladies-guess-cascade.jpg",
	Brand = "Guess",
	Sex = "Female",
},
new Product
{
	Name = "Guess Moonlight",
	Description = "Celebrate individuality with this unique and artistic watch. Designed to stand out from the crowd, this watch features a bold geometric pattern and vibrant colors, making it a statement piece for those who dare to be different.",
	Price = 16000,
	PictureUrl = "ladies-guess-moonlight.jpg",
	Brand = "Guess",
	Sex = "Female",
},
new Product
{
	Name = "Seiko Conceptual",
	Description = "Experience the allure of the ocean with this nautical-inspired watch. Featuring a navy blue dial and anchor motif, this watch captures the spirit of maritime adventure, making it the perfect accessory for seaside escapades.",
	Price = 25000,
	PictureUrl = "ladies-seiko-conceptual",
	Brand = "Seiko",
	Sex = "Female",
},
new Product
{
	Name = "Seiko Ocean",
	Description = "Achieve a sleek and sophisticated look with this slimline watch. With its ultra-thin case and minimalist design, this watch offers understated elegance and timeless appeal, perfect for the modern minimalist.",
	Price = 19900,
	PictureUrl = "ladies-seiko-ocean.jpg",
	Brand = "Seiko",
	Sex = "Female",
},
new Product
{
	Name = "Vivienne Westwood Ocean",
	Description = "Make a bold fashion statement with this statement cuff watch. Featuring an oversized dial and chunky bracelet, this watch commands attention and adds a touch of drama to any outfit, making it a must-have accessory for trendsetters.",
	Price = 13000,
	PictureUrl = "ladies-vivienne-westwood-ocean.jpg",
	Brand = "Vivienne Westwood",
	Sex = "Female",
},
new Product
{
	Name = "Vivienne Westwood Orb",
	Description = "Stay effortlessly chic with this versatile bracelet watch. With its interchangeable straps and timeless design, this watch easily transitions from day to night, ensuring you're always stylishly on time.",
	Price = 21000,
	PictureUrl = "ladies-vivienne-westwood-orb.jpg",
	Brand = "Vivienne Westwood",
	Sex = "Female",
},
new Product
{
	Name = "Vivienne Westwood Seymour",
	Description = "Indulge in luxury with this opulent diamond watch. Crafted from gleaming gold and adorned with sparkling diamonds, this watch exudes sophistication and prestige, making it the ultimate symbol of luxury and refinement.",
	Price = 22500,
	PictureUrl = "ladies-vivienne-westwood-seymour.jpg",
	Brand = "Vivienne Westwood",
	Sex = "Female",
},
new Product
{
	Name = "Boss Admiral Blue",
	Description = "Make a statement with this bold and masculine chronograph watch. With its rugged design and oversized dial, this watch is perfect for the modern man who values both style and functionality.",
	Price = 18000,
	PictureUrl = "mens-boss-admiral-blue.jpg",
	Brand = "Boss",
	Sex = "Male",
},
new Product
{
	Name = "Boss Santiago",
	Description = "Embrace classic sophistication with this timeless dress watch. Featuring a sleek stainless steel case and minimalist dial, this watch exudes understated elegance, making it a versatile accessory for any occasion.",
	Price = 23000,
	PictureUrl = "mens-boss-santiago.jpg",
	Brand = "Boss",
	Sex = "Male",
},
new Product
{
	Name = "Emporio Armani Black",
	Description = "Stay ahead of the curve with this high-tech smartwatch. Packed with advanced features like heart rate monitoring and GPS tracking, this watch combines cutting-edge technology with sleek, modern design.",
	Price = 31000,
	PictureUrl = "mens-emporio-armani-ar11242.jpg",
	Brand = "Emporio Armani",
	Sex = "Male",
},
new Product
{
	Name = "Emporio Armani Elegant",
	Description = "Channel vintage charm with this retro-inspired pilot watch. With its aviator-style dial and distressed leather strap, this watch pays homage to the golden age of aviation, making it a stylish choice for any aviation enthusiast.",
	Price = 33000,
	PictureUrl = "mens-emporio-armani-ar11310.jpg",
	Brand = "Emporio Armani",
	Sex = "Male",
},
new Product
{
	Name = "Emporio Armani Blue-Gold",
	Description = "Elevate your look with this sophisticated automatic watch. Crafted with precision and attention to detail, this watch boasts a skeleton dial and exhibition caseback, allowing you to admire the intricate inner workings of the timepiece.",
	Price = 40000,
	PictureUrl = "mens-emporio-armani-ar11362.jpg",
	Brand = "Emporio Armani",
	Sex = "Male",
},
new Product
{
	Name = "Fossil Minimalist",
	Description = "Make a bold fashion statement with this sleek blacked-out watch. With its matte black case and dial, this watch exudes modernity and sophistication, making it the perfect accessory for the urban trendsetter.",
	Price = 29000,
	PictureUrl = "mens-fossil-the-minimalist.jpg",
	Brand = "Fossil",
	Sex = "Male",
},
new Product
{
	Name = "Hamilton Khaki",
	Description = "Stay stylish and organized with this versatile watch and accessory set. Complete with interchangeable straps and coordinating cufflinks, this set offers endless styling options, ensuring you're always impeccably dressed.",
	Price = 19000,
	PictureUrl = "mens-hamilton-khaki.jpg",
	Brand = "Hamilton",
	Sex = "Male",
},
new Product
{
	Name = "Hamilton Prime",
	Description = "Experience the thrill of adventure with this rugged sports watch. Built for durability and performance, this watch features a durable stainless steel case and water resistance, making it ideal for outdoor exploration.",
	Price = 23500,
	PictureUrl = "mens-hamilton-prime.jpg",
	Brand = "Hamilton",
	Sex = "Male",
},
new Product
{
	Name = "Hamilton Silver",
	Description = "Celebrate precision engineering with this sleek and minimalist watch. With its Swiss-made movement and sapphire crystal lens, this watch offers unparalleled accuracy and durability, making it a timeless investment piece.",
	Price = 18500,
	PictureUrl = "mens-hamilton-silver.jpg",
	Brand = "Hamilton",
	Sex = "Male",
},
new Product
{
	Name = "Seiko Sports",
	Description = "Unleash your inner explorer with this military-inspired field watch. With its durable canvas strap and luminous hands, this watch is ready for any adventure, from hiking in the mountains to exploring the urban jungle.",
	Price = 24000,
	PictureUrl = "mens-seiko-5-sports.jpg",
	Brand = "Seiko",
	Sex = "Male",
},
new Product
{
	Name = "Seiko SKX",
	Description = "Add a touch of luxury to your wrist with this elegant gold-tone watch. With its rich gold-plated case and sophisticated design, this watch exudes refinement and opulence, making it a statement piece for the discerning gentleman.",
	Price = 41000,
	PictureUrl = "mens-seiko-skx.jpg",
	Brand = "Seiko",
	Sex = "Male",
},
new Product
{
	Name = "Seiko Street Style",
	Description = "Stay effortlessly cool with this retro-inspired diver's watch. Featuring a bold bezel and luminous markers, this watch offers both style and functionality, making it a must-have accessory for any water sports enthusiast.",
	Price = 24500,
	PictureUrl = "mens-seiko-street-style.jpg",
	Brand = "Seiko",
	Sex = "Male",
},
new Product
{
	Name = "Tommy Hilfiger Gold",
	Description = "Experience the thrill of the race with this sporty racing chronograph watch. With its tachymeter bezel and racing-inspired dial, this watch captures the excitement of motorsport, making it the perfect accessory for racing enthusiasts.",
	Price = 32000,
	PictureUrl = "mens-tommy-hilfiger-gold.jpg",
	Brand = "Tommy Hilfiger",
	Sex = "Male",
},
new Product
{
	Name = "Tommy Hilfiger Mason",
	Description = "Make a bold statement with this oversized pilot watch. With its large dial and rugged strap, this watch commands attention and adds a touch of adventure to any outfit, making it a favorite among aviation enthusiasts.",
	Price = 43000,
	PictureUrl = "mens-tommy-hilfiger-mason.jpg",
	Brand = "Tommy Hilfiger",
	Sex = "Male",
},
new Product
{
	Name = "Tommy Hilfiger MAX",
	Description = "Indulge in luxury with this exquisite diamond watch. Crafted from premium materials and adorned with sparkling diamonds, this watch is the epitome of elegance and sophistication, making it the ultimate status symbol for the modern man",
	Price = 33500,
	PictureUrl = "mens-tommy-hilfiger-max.jpg",
	Brand = "Tommy Hilfiger",
	Sex = "Male",
},



            };

            foreach (var product in products)
            {
             context.Products.Add(product);
            }
            context.SaveChanges();
        }
    }
}