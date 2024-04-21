import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

import './ProductCard.css';

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
    <Card className='product-card' sx={{ maxWidth: '20rem', height: '25rem' }}>
      <CardMedia
        sx={{ height: '12rem' }}
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
          {product.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-evenly' }}>
        <Button className='product-card-button' size='small'>
          Add to cart
        </Button>
        <Button className='product-more-button' size='small'>
          More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
