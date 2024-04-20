import axios from 'axios';

const baseURL = 'http://localhost:5146/api';

const initAxios = axios.create({
  baseURL,
});

const requests = {
  get: (url: string) => initAxios.get(url).then((response) => response.data),
};

const Products = {
  getAll: () => requests.get('/products'),
};

const agent = {
  Products,
};

export default agent;
