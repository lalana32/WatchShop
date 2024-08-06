import axios from 'axios';
import store from '../store';

export interface User {
  username: string;
  email: string;
  password: string;
}

const baseURL = 'http://localhost:5146/api';

const initAxios = axios.create({
  baseURL,
});

initAxios.interceptors.request.use((config) => {
  const token = store.getState().auth.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    initAxios.get(url, { params }).then((response) => response.data),
  post: (url: string, body?: Object) =>
    initAxios.post(url, body).then((response) => response.data),
  delete: (url: string) =>
    initAxios.delete(url).then((response) => response.data),
};

const Products = {
  getAll: (params?: URLSearchParams) => requests.get('/products', params),
  getById: (id: number) => requests.get(`products/${id}`),
  getBrands: () => requests.get('/products/getBrands'),
  addProduct: (data: any) => requests.post('/products', data),
  deleteProduct: (id: number) => requests.delete(`products/${id}`),
};

const Account = {
  register: (user: User) => requests.post('/auth/register', user),
  login: (credentials: any) => requests.post('/auth/login', credentials),
  currentUser: () => requests.get('/auth/currentUser'),
};

const Cart = {
  getCart: () => requests.get('/cart/get-cart'),
  addItemToCart: (productId: number) =>
    requests.post(`/cart/add-item-to-cart?productId=${productId}`, {}),
  removeItemfromCart: (cartItemId: number) =>
    requests.delete(`/cart/remove-item-from-cart?cartItemId=${cartItemId}`),
};

const Orders = {
  getOrders: (userId: string) =>
    requests.get(`/order/getOrders?userId=${encodeURIComponent(userId)}`),
  createOrder: (userId: string) =>
    requests.post(`/order/createOrder?userId=${encodeURIComponent(userId)}`),
};

const agent = {
  Products,
  Account,
  Cart,
  Orders,
};

export default agent;
