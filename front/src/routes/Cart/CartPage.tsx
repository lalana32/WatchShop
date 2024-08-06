import { purple } from '@mui/material/colors';
import { AppDispatch, RootState, useAppSelector } from '../../store';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  styled,
  TableCell,
  tableCellClasses,
  Grid,
  Typography,
  IconButton,
  Button,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { removeItemFromCartAsync } from '../../slices/cartSlice';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { NavLink } from 'react-router-dom';

const CartPage = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: purple[500],
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const { user } = useAppSelector((state: RootState) => state.auth);
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  const sum = (cart?.cartItems || [])
    .reduce((acc, cur) => acc + (cur.product.price || 0) / 100, 0)
    .toFixed(2);

    if (!user) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f9f9f9',
            padding: '2rem',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '2rem',
              borderRadius: '8px',
              textAlign: 'center',
              backgroundColor: '#fff',
              maxWidth: '400px',
            }}
          >
            <ErrorOutlineIcon
              sx={{
                fontSize: '3rem',
                color: 'purple',
                marginBottom: '1rem',
              }}
            />
            <Typography
              variant='h5'
              sx={{
                color: '#333',
                fontWeight: 'bold',
                marginBottom: '1rem',
              }}
            >
              Access Denied
            </Typography>
            <Typography
              variant='body1'
              sx={{
                color: '#555',
              }}
            >
              Only logged-in users can see this content. Please log in to view this page.
            </Typography>
          </Paper>
        </Box>
      );
    };

  if (user && cart?.cartItems?.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f9f9f9',
          padding: '2rem',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
            borderRadius: '8px',
            textAlign: 'center',
            backgroundColor: '#fff',
            maxWidth: '400px',
          }}
        >
          <RemoveShoppingCartIcon
            sx={{
              fontSize: '4rem',
              color: 'purple',
              marginBottom: '1rem',
            }}
          />
          <Typography
            variant='h5'
            sx={{
              color: '#333',
              fontWeight: 'bold',
              marginBottom: '1rem',
            }}
          >
            Your Cart is Empty
          </Typography>
          <Typography
            variant='body1'
            sx={{
              color: '#555',
              marginBottom: '1rem',
            }}
          >
            It looks like you haven’t added any items to your cart yet. Start shopping to fill it up!
          </Typography>
        </Paper>
      </Box>
    );
  };

  return (
    <div style={{ marginTop: 30, marginBottom: 50 }}>
      <div>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{ minHeight: '100vh', p: 2 }}
        >
          <Grid item xs={12} sm={10} md={8} lg={10}>
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
              <Table aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      <Typography variant='h6'>Name</Typography>
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      <Typography variant='h6'>Brand</Typography>
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      <Typography variant='h6'>Price ($)</Typography>
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      <Typography variant='h6'>Sex</Typography>
                    </StyledTableCell>
                    <StyledTableCell align='right'></StyledTableCell>
                    <StyledTableCell align='right'></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart?.cartItems?.map((cartItem) => (
                    <StyledTableRow key={cartItem.id}>
                      <StyledTableCell component='th' scope='row'>
                        {cartItem.product.name}
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        {cartItem.product.brand}
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        {cartItem.product.price / 100}
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        {cartItem.product.sex}
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <img
                          src={`${cartItem.product.pictureUrl}`}
                          alt='product'
                          style={{
                            width: '100%',
                            maxWidth: '90px',
                            height: 'auto',
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <IconButton
                          aria-label='delete'
                          color='secondary'
                          onClick={() =>
                            dispatch(removeItemFromCartAsync(cartItem.id))
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Paper
          sx={{
            padding: 2,
            margin: 'auto',
            width: {
              xs: '100%',
              sm: '90%',
              md: '80%',
              lg: '90%',
              xl: '100%',
            },
            maxWidth: '80%',
            marginTop: 2,
          }}
        >
          <Grid container alignItems='center' justifyContent='space-between'>
            <Grid item>
              <Typography variant='body1'>Price: ${sum}</Typography>
            </Grid>
            <Grid item xs={3} sm={2}>
              <NavLink to={'/checkout'}>
                <Button variant='contained' color='success' fullWidth>
                  Checkout
                </Button>
              </NavLink>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default CartPage;
