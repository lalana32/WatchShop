import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import agent from '../../api/agent';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
} from '@mui/material';

interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  pictureUrl: string;
  sex: string;
}

const ProductInformation = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await agent.Products.getById(Number(id));
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.log('Unable to get product', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      maxWidth='lg'
      style={{ height: '100vh', display: 'flex', alignItems: 'center' }}
    >
      <Grid container spacing={3} justifyContent='center' alignItems='center'>
        <Grid item xs={12} md={6} textAlign='center'>
          <Paper elevation={3} style={{ height: '100%' }}>
            <img
              src={`/${product?.pictureUrl}`}
              alt='fotka'
              style={{ maxWidth: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <List>
              <ListItem>
                <Typography variant='h3'>{product?.name}</Typography>
              </ListItem>
              <Divider variant='middle' component='li' />
              <ListItem>
                <Typography variant='h6'>{product?.description}</Typography>
              </ListItem>
              <Divider variant='middle' component='li' />
              <ListItem>
                <Typography variant='h6'>{`Price: ${
                  (product?.price ?? 0) / 100
                }€`}</Typography>
              </ListItem>
              <Divider variant='middle' component='li' />
              <ListItem>
                <Button className='product-card-button' size='small'>
                  Add to cart
                </Button>
              </ListItem>
              <Divider variant='middle' component='li' />
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductInformation;
