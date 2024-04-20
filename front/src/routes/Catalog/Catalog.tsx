import { useState, useEffect } from 'react';
import agent from '../../api/agent';
import ProductCard from '../../components/productCard/ProductCard';
import './Catalog.styles.css';
import { CircularProgress } from '@mui/material';

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
    <div style={{ padding: 50 }}>
      <div className='product-card-container'>
        {products.map((product: Product) => (
          <div key={product.id} className='product-card-wrapper'>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
