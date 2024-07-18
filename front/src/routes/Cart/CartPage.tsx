import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppSelector } from '../../store';
import { useEffect } from 'react';
import { currentUser } from '../../slices/authSlice';

const CartPage = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <div>
      {user ? (
        <div>
          <h1>User logged in</h1>
          <h3>username: {user.username}</h3>
          <h3>username: {user.email}</h3>
        </div>
      ) : (
        <h1>Only logged users can see the cart</h1>
      )}
    </div>
  );
};

export default CartPage;
