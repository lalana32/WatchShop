import { LockOutlined } from '@mui/icons-material';
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';

import agent, { User } from '../../api/agent';
import { SubmitHandler, useForm } from 'react-hook-form';

const SignIn = () => {
  const { register, handleSubmit, reset } = useForm<User>();

  const logInSubmit: SubmitHandler<User> = async (data) => {
    var response = await agent.Account.login(data);
    console.log(response);
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
          Sign in
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit(logInSubmit)}
          sx={{ mt: 1 }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            {...register('username', { required: true, maxLength: 20 })}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            label='Password'
            type='password'
            id='password'
            {...register('password', {
              required: true,
              maxLength: 20,
              minLength: 6,
            })}
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='success'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container></Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
