import { Avatar, Button, Grid, Paper, Typography } from '@mui/material';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { RootState, useAppSelector } from '../../store';
import { deepPurple, purple } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../slices/authSlice';
import { clearCart } from '../../slices/cartSlice';

const AccountPage = () => {
  const dispatch = useDispatch();

  const { user } = useAppSelector((state: RootState) => state.auth);

  const handleLogOut = () => {
    dispatch(clearUser());
    dispatch(clearCart());
  };

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      sx={{ height: '100vh' }}
    >
      {user ? (
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Grid container spacing={2} alignItems='center' direction='column'>
              <Grid item>
                <Avatar sx={{ width: 56, height: 56, bgcolor: purple[500] }}>
                  {user.username.charAt(0).toUpperCase()}
                </Avatar>
              </Grid>
              <Grid item>
                <Typography variant='h2'>{user.username}</Typography>
              </Grid>
              <Grid item>
                <Typography variant='h5'>{user.email}</Typography>
              </Grid>
              <Grid item sx={{ mt: 2 }}>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={handleLogOut}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ) : (
        <Grid
          container
          spacing={2}
          justifyContent='center'
          alignItems='center'
          sx={{ height: '100vh' }}
        >
          <Grid item>
            <SignUp />
          </Grid>
          <Grid item>
            <SignIn />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default AccountPage;
