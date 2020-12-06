import axios from 'axios';

const api = axios.create({
  baseURL: 'http://104.44.139.101',
});

export default api;
