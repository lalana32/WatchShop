import { useFormContext, Controller } from 'react-hook-form';
import { Grid, OutlinedInput, FormLabel } from '@mui/material';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const PaymentForm = () => {
  const { control } = useFormContext();

  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12}>
        <FormLabel htmlFor='card-name' required>
          Cardholder Name
        </FormLabel>
        <Controller
          name='cardName'
          control={control}
          defaultValue=''
          rules={{ required: 'Cardholder name is required' }}
          render={({ field }) => (
            <>
              <OutlinedInput
                id='card-name'
                placeholder='John Doe'
                autoComplete='cc-name'
                {...field}
              />
            </>
          )}
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor='card-number' required>
          Card Number
        </FormLabel>
        <Controller
          name='cardNumber'
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
                id='card-number'
                placeholder='1234 5678 9012 3456'
                autoComplete='cc-number'
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
        <FormLabel htmlFor='expiry-date' required>
          Expiry Date
        </FormLabel>
        <Controller
          name='expiryDate'
          control={control}
          defaultValue=''
          rules={{
            required: 'Zip is required',
          }}
          render={({ field }) => (
            <>
              <OutlinedInput
                id='expiry-date'
                placeholder='MM/YY'
                autoComplete='cc-exp'
                {...field}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                }}
              />
            </>
          )}
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor='cvv' required>
          CVV
        </FormLabel>
        <Controller
          name='cvv'
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
                id='cvv'
                placeholder='123'
                autoComplete='cc-csc'
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
    </Grid>
  );
};

export default PaymentForm;
