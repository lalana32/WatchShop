import {
  Avatar,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import SignUp from './SignUp';
import { RootState, useAppSelector } from '../../store';
import { purple } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../slices/authSlice';
import { clearCart } from '../../slices/cartSlice';
import { useEffect, useState } from 'react';
import agent from '../../api/agent';

interface Order {
  orderId: number;
  orderItems: OrderItem[];
  orderDate: string;
}

interface OrderItem {
  name: string;
  pictureUrl: string;
  price: number;
}

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: '16px',
  boxShadow: theme.shadows[5],
}));

const TableHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.grey[200],
}));

const OrderTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.primary,
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  bgcolor: purple[500],
  fontSize: '2rem',
}));

const AccountPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const dispatch = useDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = user?.id;
        if (userId) {
          const fetchedOrders = await agent.Orders.getOrders(userId);
          setOrders(fetchedOrders);
        } else {
          console.log('ID korisnika nije definisan.');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, [user]);

  const handleLogOut = () => {
    dispatch(clearUser());
    dispatch(clearCart());
  };

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      sx={{ height: '100vh', backgroundColor: '#f5f5f5', padding: 2 }}
    >
      {user ? (
        <Grid item xs={12} sm={10} md={8}>
          <ProfilePaper elevation={3}>
            <Grid container spacing={4} alignItems='center' direction='column'>
              <Grid item>
                <AvatarStyled>
                  {user.username.charAt(0).toUpperCase()}
                </AvatarStyled>
              </Grid>
              <Grid item>
                <Typography variant='h4' component='h2' gutterBottom>
                  {user.username}
                </Typography>
                <Typography variant='h6'>{user.email}</Typography>
              </Grid>
              <Grid item sx={{ width: '100%' }}>
                <TableContainer
                  component={Paper}
                  sx={{
                    width: '100%',
                    overflowX: 'auto',
                    borderRadius: '16px',
                    boxShadow: (theme) => theme.shadows[1],
                  }}
                >
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Order ID</TableHeaderCell>
                        <TableHeaderCell align='right'>
                          Order Date
                        </TableHeaderCell>
                        <TableHeaderCell align='right'>
                          Order Time
                        </TableHeaderCell>
                        <TableHeaderCell align='right'>Price $</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow
                          key={order.orderId}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            '&:hover': { backgroundColor: '#f0f0f0' },
                          }}
                        >
                          <OrderTableCell component='th' scope='row'>
                            {order.orderId}
                          </OrderTableCell>
                          <OrderTableCell align='right'>
                            {order.orderDate
                              ? new Date(order.orderDate).toLocaleDateString()
                              : 'N/A'}
                          </OrderTableCell>
                          <OrderTableCell align='right'>
                            {order.orderDate
                              ? new Date(order.orderDate).toLocaleTimeString()
                              : 'N/A'}
                          </OrderTableCell>
                          <OrderTableCell align='right'>
                            {order.orderItems
                              .reduce(
                                (acc, cur) => acc + (cur.price || 0) / 100,
                                0
                              )
                              .toFixed(2)}
                          </OrderTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item sx={{ mt: 4 }}>
                <Button
                  variant='contained'
                  color='secondary'
                  sx={{ borderRadius: '8px' }}
                  onClick={handleLogOut}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </ProfilePaper>
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
        </Grid>
      )}
    </Grid>
  );
};

export default AccountPage;
