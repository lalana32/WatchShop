import React from 'react';
import { useFormContext } from 'react-hook-form';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../store';

const Review = () => {
  const { getValues } = useFormContext();
  const values = getValues();

  const addresses = [
    values.address1,
    values.address2,
    values.city,
    values.state,
    values.zip,
    values.country,
  ]
    .filter(Boolean)
    .join(', ');

  const payments = [
    { name: 'Card type:', detail: values.cardType || 'N/A' },
    { name: 'Card holder:', detail: values.cardName || 'N/A' },
    {
      name: 'Card number:',
      detail: `xxxx-xxxx-xxxx-${values.cardNumber?.slice(-4) || 'xxxx'}`,
    },
    { name: 'Expiry date:', detail: values.expiryDate || 'N/A' },
  ];

  const cart = useAppSelector((state) => state.cart);

  const sum = (cart.cart?.cartItems || []).reduce(
    (acc, cur) => acc + (cur.product.price || 0) / 100,
    0
  );

  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary='Products'
            secondary={`${cart.cart?.cartItems.length}`}
          />
          <Typography variant='body2'>${sum.toFixed(2)}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Shipping' secondary='Plus taxes' />
          <Typography variant='body2'>Free</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            ${sum}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction='column'
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant='subtitle2' gutterBottom>
            Shipment details
          </Typography>
          <Typography gutterBottom>
            {values.firstName} {values.lastName}
          </Typography>
          <Typography color='text.secondary' gutterBottom>
            {addresses}
          </Typography>
        </div>
        <div>
          <Typography variant='subtitle2' gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Stack
                  direction='row'
                  spacing={1}
                  useFlexGap
                  sx={{ width: '100%', mb: 1 }}
                >
                  <Typography variant='body1' color='text.secondary'>
                    {payment.name}
                  </Typography>
                  <Typography variant='body2'>{payment.detail}</Typography>
                </Stack>
              </React.Fragment>
            ))}
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
};

export default Review;
