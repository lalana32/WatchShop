import { LockOutlined } from '@mui/icons-material';
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import agent, { User } from '../../api/agent';

const SignUp = () => {
  const { register, handleSubmit, reset } = useForm<User>(); // Dohvatanje funkcija iz react-hook-form biblioteke

  const signUpSubmit: SubmitHandler<User> = (data) => {
    agent.Account.register(data); // Poziv funkcije za registraciju korisnika iz agent modula
    reset();
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit(signUpSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register('username', { required: true, maxLength: 20 })}
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('email', { required: true })}
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('password', {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })} // Povezivanje register funkcije sa input poljem za password
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='success'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
