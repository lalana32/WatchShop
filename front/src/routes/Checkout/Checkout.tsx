import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useForm, FormProvider } from 'react-hook-form';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../store';
import { clearCart } from '../../slices/cartSlice';
import agent from '../../api/agent';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const Checkout = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAppSelector((state) => state.auth);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      cardType: '',
      cardName: '',
      cardNumber: '',
      expiryDate: '',
    },
  });

  const handleFinishOrder = () => {
    dispatch(clearCart());
  };

  const {
    formState: { isValid, isSubmitting },
  } = methods;

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      if (!user?.id) {
        console.error('User ID is not available.');
        return;
      }

      try {
        await agent.Orders.createOrder(user.id);
        dispatch(clearCart());
        console.log(user.id);
        setActiveStep((prev) => prev + 1);
      } catch (error) {
        console.log(error);
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      style={{ height: '100vh' }}
    >
      <CssBaseline />
      <Grid
        item
        sm={12}
        md={7}
        lg={8}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '100%',
          width: '100%',
          backgroundColor: { xs: 'transparent', sm: 'background.default' },
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            flexGrow: 1,
            height: 150,
          }}
        >
          <Stepper
            color='secondary'
            id='desktop-stepper'
            activeStep={activeStep}
            sx={{
              width: '100%',
              height: 100,
            }}
          >
            {steps.map((label) => (
              <Step
                sx={{
                  ':first-child': { pl: 0 },
                  ':last-child': { pr: 0 },
                }}
                key={label}
              >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Card
          sx={{
            display: { xs: 'flex', md: 'none' },
            width: '100%',
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              ':last-child': { pb: 2 },
            }}
          >
            <div>
              <Typography variant='subtitle2' gutterBottom>
                Selected products
              </Typography>
              <Typography variant='body1'>
                {activeStep >= 2 ? '$144.97' : '$134.98'}
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            width: '100%',
            maxWidth: { sm: '100%', md: 600 },
            maxHeight: '720px',
            gap: { xs: 5, md: 'none' },
          }}
        >
          <Stepper
            id='mobile-stepper'
            activeStep={activeStep}
            alternativeLabel
            sx={{
              display: { sm: 'flex', md: 'none' },
            }}
          >
            {steps.map((label) => (
              <Step
                sx={{
                  ':first-child': { pl: 0 },
                  ':last-child': { pr: 0 },
                  '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                }}
                key={label}
              >
                <StepLabel
                  sx={{
                    '.MuiStepLabel-labelContainer': { maxWidth: '70px' },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Stack spacing={2} useFlexGap>
              <Typography variant='h1'>📦</Typography>
              <Typography variant='h5'>Thank you for your order!</Typography>
              <Typography variant='body1' color='text.secondary'>
                We have emailed your order confirmation and will update you once
                it's shipped.
              </Typography>
              <NavLink to={'/account'}>
                <Button
                  onClick={handleFinishOrder}
                  variant='contained'
                  color='success'
                  sx={{
                    alignSelf: 'start',
                    width: { xs: '100%', sm: 'auto' },
                  }}
                >
                  My orders
                </Button>
              </NavLink>
            </Stack>
          ) : (
            <FormProvider {...methods}>
              {getStepContent(activeStep)}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column-reverse', sm: 'row' },
                  justifyContent:
                    activeStep !== 0 ? 'space-between' : 'flex-end',
                  alignItems: 'end',
                  flexGrow: 1,
                  gap: 1,
                  pb: { xs: 12, sm: 0 },
                  mt: { xs: 2, sm: 0 },
                  mb: '60px',
                }}
              >
                {activeStep !== 0 && (
                  <Button
                    startIcon={<ChevronLeftRoundedIcon />}
                    onClick={handleBack}
                    variant='text'
                    sx={{
                      display: { xs: 'none', sm: 'flex' },
                    }}
                  >
                    Previous
                  </Button>
                )}
                {activeStep !== 0 && (
                  <Button
                    startIcon={<ChevronLeftRoundedIcon />}
                    onClick={handleBack}
                    variant='outlined'
                    fullWidth
                    sx={{
                      display: { xs: 'flex', sm: 'none' },
                    }}
                  >
                    Previous
                  </Button>
                )}
                <Button
                  color='success'
                  variant='contained'
                  endIcon={<ChevronRightRoundedIcon />}
                  onClick={handleNext}
                  sx={{
                    width: { xs: '100%', sm: 'fit-content' },
                  }}
                  disabled={!isValid || isSubmitting}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </FormProvider>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Checkout;
