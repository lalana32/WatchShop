import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Input,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Product } from '../Catalog/Catalog';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import agent from '../../api/agent';

const AddProduct = () => {
  const location = useLocation();
  const products: Product[] = location.state.products;

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const uniqueBrands = Array.from(
    new Set(products.map((product: Product) => product.brand))
  );

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('name', data.productName);
    formData.append('description', data.productDescription);
    formData.append('price', data.productPrice);
    formData.append('brand', data.selectedBrand);
    formData.append('sex', data.gender);
    if (data.file[0]) {
      formData.append('picture', data.file[0]);
    } else {
      console.error('No file selected');
      return;
    }

    try {
      await agent.Products.addProduct(formData);
      setSnackbarMessage('Product added successfully!');
      setOpenSnackbar(true);
      reset();
    } catch (error) {
      setSnackbarMessage('Error adding product.');
      setOpenSnackbar(true);
      console.error('Error adding product:', error);
    }
  };

  return (
    <Container component='main' maxWidth='sm'>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 2,
          p: 2,
          maxWidth: '100%',
          mx: 'auto',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          bgcolor: '#fff',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Add Product
        </h1>

        <Controller
          name='productName'
          defaultValue=''
          control={control}
          rules={{ required: 'Product Name is required' }}
          render={({ field }) => (
            <TextField
              id='product-name'
              label='Product Name'
              variant='outlined'
              color='secondary'
              fullWidth
              {...field}
              error={!!errors.productName}
            />
          )}
        />

        <Controller
          name='productDescription'
          defaultValue=''
          control={control}
          rules={{ required: 'Description is required' }}
          render={({ field }) => (
            <TextField
              id='product-description'
              label='Description'
              variant='outlined'
              color='secondary'
              multiline
              maxRows={4}
              fullWidth
              {...field}
              error={!!errors.productDescription}
            />
          )}
        />

        <Controller
          name='selectedBrand'
          defaultValue=''
          control={control}
          rules={{ required: 'Brand is required' }}
          render={({ field }) => (
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id='brand-select-label'>Brand</InputLabel>
              <Select
                color='secondary'
                labelId='brand-select-label'
                id='brand-select'
                {...field}
                error={!!errors.selectedBrand}
                input={<OutlinedInput label='Brand' />}
              >
                {uniqueBrands.map((brand: string) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name='productPrice'
          defaultValue=''
          control={control}
          rules={{
            required: 'Price is required',
            pattern: { value: /^[0-9]+$/, message: 'Price must be a number' },
          }}
          render={({ field }) => (
            <TextField
              id='product-price'
              label='Price $'
              variant='outlined'
              color='secondary'
              fullWidth
              type='number'
              {...field}
              error={!!errors.productPrice}
            />
          )}
        />

        <Controller
          name='gender'
          control={control}
          rules={{ required: 'Gender is required' }}
          render={({ field }) => (
            <FormControl sx={{ width: '100%' }}>
              <FormLabel id='gender-radio-group'>Gender</FormLabel>
              <RadioGroup aria-labelledby='gender-radio-group' {...field} row>
                <FormControlLabel
                  value='Female'
                  control={<Radio color='secondary' />}
                  label='Female'
                />
                <FormControlLabel
                  value='Male'
                  control={<Radio color='secondary' />}
                  label='Male'
                />
              </RadioGroup>
            </FormControl>
          )}
        />

        <FormControl sx={{ width: '100%' }}>
          <FormLabel id='file-upload'>Picture</FormLabel>
          <Input
            id='file-upload'
            type='file'
            inputProps={{ accept: 'image/*' }}
            {...register('file', { required: 'Picture is required' })}
          />
        </FormControl>

        <Button
          type='submit'
          variant='contained'
          color='secondary'
          disabled={!isValid}
          sx={{ mt: 2 }}
        >
          Add Product
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarMessage.includes('Error') ? 'error' : 'success'}
          variant='filled'
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddProduct;
