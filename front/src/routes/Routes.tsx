import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from './HomePage/HomePage';
import Catalog from './Catalog/Catalog';
import Contact from './Contact/Contact';
import Faq from './FAQ/Faq';
import Cart from './Cart/CartPage';
import AccountPage from './Account/AccountPage';
import ProductInformation from './ProductMore/ProductInformation';
import Checkout from './Checkout/Checkout';
import SignIn from './Account/SignIn';
import Inventory from './Inventory/Inventory';
import AddProduct from './AddProduct/AddProduct';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'catalog', element: <Catalog /> },
      { path: 'contact', element: <Contact /> },
      { path: 'faq', element: <Faq /> },
      { path: 'cart', element: <Cart /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'catalog/product/:id', element: <ProductInformation /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'sign-in', element: <SignIn /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'add-product', element: <AddProduct /> },
    ],
  },
]);
