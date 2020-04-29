import axios from 'axios';

const api = axios.create({ baseURL: 'https://metocontagiante-backend.herokuapp.com/api' });

export default api;