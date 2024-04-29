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
};

const Products = {
  getAll: () => requests.get('/products'),
};

const Account = {
  register: (user: User) => requests.post('/auth/register', user),
  login: (credentials: any) => requests.post('/auth/login', credentials),
};

const agent = {
  Products,
  Account,
};

export default agent;
