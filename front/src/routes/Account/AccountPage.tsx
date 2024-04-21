import { Grid } from '@mui/material';
import SignIn from './SignIn';
import SignUp from './SignUp';

const AccountPage = () => {
  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <SignUp />
      <SignIn />
    </Grid>
  );
};

export default AccountPage;
