import axios from 'axios';
const baseURL = process.env.NODE_ENV === 'production' ? 'https://metocontagiante-backend.herokuapp.com/api' : 'http://10.0.0.133:3001/api';
const api = axios.create({ baseURL });

export default api;