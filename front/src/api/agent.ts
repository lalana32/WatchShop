import axios from 'axios';

export interface User {
  username: string;
  email: string;
  password: string;
}

const baseURL = 'http://localhost:5146/api';

const initAxios = axios.create({
  baseURL,
});

const requests = {
  get: (url: string) => initAxios.get(url).then((response) => response.data),
  post: (url: string, data: any) =>
    initAxios.post(url, data).then((response) => response.data),
  delete: (url: string) => axios.delete(url).then((response) => response.data),
};

const Products = {
  getAll: () => requests.get('/products'),
  getById: (id: number) => requests.get(`products/${id}`),
};

const Account = {
  register: (user: User) => requests.post('/auth/register', user),
  login: (credentials: any) => requests.post('/auth/login', credentials),
  currentUser: () => requests.get('/auth/currentUser'),
};

const Cart = {
  getCart: () => requests.get('/cart/get-cart'),
  addItemToCart: (productId: number) =>
    requests.post('/cart/add-item-to-cart', productId),
  removeItemfromCart: (cartItemId: number) =>
    requests.delete(`/cart/-remove-item-from-cart/${cartItemId}`),
};

const agent = {
  Products,
  Account,
  Cart,
};

export default agent;
