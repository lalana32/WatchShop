import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useAppSelector } from '../../store';

const NavBar = () => {
  const { cart } = useAppSelector((state) => state.cart);
  console.log('Košarica:', cart);
  const badgeNumber = cart?.cartItems.length || 0;

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

        <NavLink to={'/catalog'}>Catalog</NavLink>
        <NavLink to={'/contact'}>Contact</NavLink>
        <NavLink to={'/faq'}>FAQ</NavLink>
        <NavLink to={'/cart'}>
          <IconButton aria-label='cart'>
            <Badge badgeContent={`${badgeNumber}`} color='secondary'>
              <ShoppingCartIcon style={{ color: 'white' }} />
            </Badge>
          </IconButton>
        </NavLink>

        <div>
          <NavLink to={'/account'}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              // onClick={handleMenu}
              color='inherit'
            >
              <AccountCircle sx={{ fontSize: 32 }} />
            </IconButton>
          </NavLink>
          <Menu
            id='menu-appbar'
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={false} // open={Boolean(anchorEl)}
            // onClose={handleClose}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
