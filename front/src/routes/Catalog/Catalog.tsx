import { useState, useEffect } from 'react';
import agent from '../../api/agent';
import ProductCard from '../../components/productCard/ProductCard';
import './Catalog.styles.css';
import { CircularProgress, Container, Grid } from '@mui/material';

interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  pictureUrl: string;
  sex: string;
}

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await agent.Products.getAll();
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  console.log(products);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
        <CircularProgress color='success' />
      </div>
    );
  }

  return (
    <Grid
      className='product-card-container'
      container
      spacing={1}
      sx={{ padding: '5rem' }}
    >
      {products.map((product: Product) => (
        <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
          <ProductCard {...product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Catalog;
