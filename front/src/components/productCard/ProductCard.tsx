import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

import './ProductCard.css';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  pictureUrl: string;
  sex: string;
}

const ProductCard = (product: Product) => {
  return (
    <Card
      className='product-card'
      sx={{ maxWidth: '20rem', height: '25rem', width: '16rem' }}
    >
      <CardMedia
        sx={{
          height: '13rem',
          objectFit: 'contain', // Koristite contain za punu vidljivost slike
          width: '100%', // Postavite širinu na 100% za pravilno prikazivanje
          display: 'flex', // Postavite display na flex za bolje centriranje
          justifyContent: 'center', // Centrirajte sliku horizontalno
          alignItems: 'center',
        }}
        image={product.pictureUrl}
        className='product-card-image'
      />
      <CardContent className='product-card-content'>
        <Typography
          gutterBottom
          variant='h5'
          component='div'
          className='product-name'
        >
          {product.name.length > 14
            ? `${product.name.slice(0, 14)} ...`
            : product.name}
        </Typography>
        <Typography variant='body2' className='product-description'>
          {product.description.length > 48
            ? `${product.description.slice(0, 48)} ...`
            : product.description}
        </Typography>

        <Typography sx={{ paddingTop: '0.2rem' }}>
          ${(product.price / 100).toFixed(0)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-evenly' }}>
        <Button className='product-card-button' size='small'>
          Add to cart
        </Button>
        <Link to={`/catalog/product/${product.id}`}>
          <Button className='product-more-button' size='small'>
            More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
