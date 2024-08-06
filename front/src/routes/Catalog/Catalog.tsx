import { useState, useEffect } from 'react';
import agent from '../../api/agent';
import ProductCard from '../../components/productCard/ProductCard';
import './Catalog.styles.css';
import {
  CircularProgress,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
  FormControl,
  Radio,
  RadioGroup,
  Box,
  Pagination,
} from '@mui/material';

export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  pictureUrl: string;
  sex: string;
}

interface Filters {
  brands: string[];
  sex: string;
  sortBy: string;
}

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allBrands, setAllBrands] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [filters, setFilters] = useState<Filters>({
    brands: [],
    sex: '',
    sortBy: 'name',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const convertFiltersToParams = (filters: Filters, currentPage: number) => {
    const params = new URLSearchParams();

    filters.brands.forEach((brand) => params.append('brands', brand));
    if (filters.sex) params.append('sex', filters.sex);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    params.append('page', currentPage.toString());
    params.append('pageSize', '6');

    return params;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = convertFiltersToParams(filters, currentPage);
        const fetchedProducts = await agent.Products.getAll(params);
        setProducts(fetchedProducts.products);
        setTotalPages(fetchedProducts.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [filters, currentPage]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const fetchedBrands = await agent.Products.getBrands();
        setAllBrands(fetchedBrands);
      } catch (error) {
        console.log('Error fetching brands', error);
      }
    };

    fetchBrands();
  }, []);

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const brand = event.target.value;
    setFilters((prev: any) => ({
      ...prev,
      brands: event.target.checked
        ? [...prev.brands, brand]
        : prev.brands.filter((b: string) => b !== brand),
    }));
  };

  const handleSexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      sex: event.target.value,
    }));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: event.target.value as string,
    }));
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

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
      container
      className='mainContainer'
      spacing={2}
      sx={{ padding: '5rem' }}
    >
      <Grid item container xs={12} md={9} spacing={2}>
        {products.map((product: Product) => (
          <Grid key={product.id} item xs={12} sm={12} md={6} lg={4}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={{ padding: '2rem', borderRadius: '1rem' }}>
          <Typography
            variant='h5'
            sx={{ marginBottom: '1rem', fontWeight: 'bold' }}
          >
            Filter by gender
          </Typography>
          <FormControl component='fieldset' fullWidth>
            <RadioGroup
              aria-label='gender'
              name='gender'
              value={filters.sex}
              onChange={handleSexChange}
            >
              <FormControlLabel value='male' control={<Radio />} label='Male' />
              <FormControlLabel
                value='female'
                control={<Radio />}
                label='Female'
              />
              <FormControlLabel value='' control={<Radio />} label='All' />
            </RadioGroup>
          </FormControl>
          <Box sx={{ marginTop: '2rem' }}>
            <Typography
              variant='h5'
              sx={{ marginBottom: '1rem', fontWeight: 'bold' }}
            >
              Filter by brand
            </Typography>
            <FormGroup>
              {allBrands.map((brand: string) => (
                <FormControlLabel
                  key={brand}
                  control={
                    <Checkbox
                      value={brand}
                      checked={filters.brands.includes(brand)}
                      onChange={handleBrandChange}
                    />
                  }
                  label={brand}
                />
              ))}
            </FormGroup>
          </Box>
          <Box sx={{ marginTop: '2rem' }}>
            <Typography
              variant='h5'
              sx={{ marginBottom: '1rem', fontWeight: 'bold' }}
            >
              Sort by
            </Typography>
            <FormControl fullWidth>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue='name'
                name='radio-buttons-group'
                onChange={handleSortChange}
              >
                <FormControlLabel
                  value='name'
                  control={<Radio />}
                  label='Name - From A to Z'
                />
                <FormControlLabel
                  value='price_asc'
                  control={<Radio />}
                  label='Price - Lowest first'
                />
                <FormControlLabel
                  value='price_desc'
                  control={<Radio />}
                  label='Price - Highest first'
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Paper>
      </Grid>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color='secondary'
        sx={{ marginTop: 2 }}
      />
    </Grid>
  );
};

export default Catalog;
