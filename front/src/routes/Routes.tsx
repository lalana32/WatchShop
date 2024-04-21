import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from './HomePage/HomePage';
import Catalog from './Catalog/Catalog';
import Contact from './Contact/Contact';
import Faq from './FAQ/Faq';
import Cart from './Cart/Cart';
import AccountPage from './Account/AccountPage';

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
    ],
  },
]);
