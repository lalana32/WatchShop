import { useFormContext, Controller } from 'react-hook-form';
import { Grid, OutlinedInput, FormLabel } from '@mui/material';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const AddressForm = ({ onSave }: any) => {
  const { control, handleSubmit } = useFormContext();

  const onSubmit = (data: any) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor='first-name' required>
            First name
          </FormLabel>
          <Controller
            name='firstName'
            control={control}
            defaultValue=''
            rules={{ required: 'First name is required' }}
            render={({ field }) => (
              <>
                <OutlinedInput
                  id='first-name'
                  placeholder='Name'
                  autoComplete='first name'
                  {...field}
                />
              </>
            )}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor='last-name' required>
            Last name
          </FormLabel>
          <Controller
            name='lastName'
            control={control}
            defaultValue=''
            rules={{ required: 'Last name is required' }}
            render={({ field }) => (
              <>
                <OutlinedInput
                  id='last-name'
                  placeholder='Surname'
                  autoComplete='last name'
                  {...field}
                />
              </>
            )}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor='address1' required>
            Address line 1
          </FormLabel>
          <Controller
            name='address1'
            control={control}
            defaultValue=''
            rules={{ required: 'Address is required' }}
            render={({ field }) => (
              <>
                <OutlinedInput
                  id='address1'
                  placeholder='Street name and number'
                  autoComplete='shipping address-line1'
                  {...field}
                />
              </>
            )}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor='address2'>Address line 2</FormLabel>
          <Controller
            name='address2'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <>
                <OutlinedInput
                  id='address2'
                  placeholder='Apartment, suite, unit, etc. (optional)'
                  autoComplete='shipping address-line2'
                  {...field}
                />
              </>
            )}
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor='city' required>
            City
          </FormLabel>
          <Controller
            name='city'
            control={control}
            defaultValue=''
            rules={{ required: 'City is required' }}
            render={({ field }) => (
              <>
                <OutlinedInput
                  id='city'
                  placeholder='New York'
                  autoComplete='city'
                  {...field}
                />
              </>
            )}
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor='state' required>
            State
          </FormLabel>
          <Controller
            name='state'
            control={control}
            defaultValue=''
            rules={{ required: 'State is required' }}
            render={({ field }) => (
              <>
                <OutlinedInput
                  id='state'
                  placeholder='NY'
                  autoComplete='state'
                  {...field}
                />
              </>
            )}
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor='zip' required>
            Zip / Postal code
          </FormLabel>
          <Controller
            name='zip'
            control={control}
            defaultValue=''
            rules={{
              required: 'Zip is required',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Zip must be a number',
              },
            }}
            render={({ field }) => (
              <>
                <OutlinedInput
                  id='zip'
                  placeholder='12345'
                  autoComplete='shipping postal-code'
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    field.onChange(value);
                  }}
                />
              </>
            )}
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor='country' required>
            Country
          </FormLabel>
          <Controller
            name='country'
            control={control}
            defaultValue=''
            rules={{ required: 'Country is required' }}
            render={({ field }) => (
              <>
                <OutlinedInput
                  id='country'
                  placeholder='United States'
                  autoComplete='shipping country'
                  {...field}
                />
              </>
            )}
          />
        </FormGrid>
      </Grid>
    </form>
  );
};

export default AddressForm;
