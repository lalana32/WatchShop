import { AppBar, Toolbar, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useAppSelector } from '../../store';
import './NavBar.styles.css';

const NavBar = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  const badgeNumber = cart?.cartItems?.length || 0;

  return (
    <AppBar sx={{ width: 1 / 1, backgroundColor: '#4caf50' }} position='sticky'>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <NavLink to={'/'}>
          <img
            src='/photos/icons8-watch-100.png'
            style={{ height: 60 }}
            alt='logo'
          />
        </NavLink>

        <NavLink className='whiteLink' to={'/catalog'}>
          Catalog
        </NavLink>
        <NavLink className='whiteLink' to={'/contact'}>
          Contact
        </NavLink>
        <NavLink className='whiteLink' to={'/faq'}>
          FAQ
        </NavLink>
        {user?.roles?.includes('Admin') && (
          <NavLink className='whiteLink' to={'/inventory'}>
            Inventory
          </NavLink>
        )}
        <NavLink to={'/cart'}>
          <IconButton aria-label='cart'>
            <Badge badgeContent={`${badgeNumber}`} color='secondary'>
              <ShoppingCartIcon style={{ color: 'white' }} />
            </Badge>
          </IconButton>
        </NavLink>

        <div>
          <NavLink className='whiteLink' to={'/account'}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              color='inherit'
            >
              <AccountCircle sx={{ fontSize: 32 }} />
            </IconButton>
          </NavLink>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
