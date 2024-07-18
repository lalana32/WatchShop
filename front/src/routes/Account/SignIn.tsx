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

import { User } from '../../api/agent';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../slices/authSlice';
import { AppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { register, handleSubmit, reset } = useForm<User>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const logInSubmit: SubmitHandler<User> = async (data: FieldValues) => {
    const userLoginResult = await dispatch(userLogin(data));
    navigate('/catalog');
    console.log('User login result:', userLoginResult);

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
