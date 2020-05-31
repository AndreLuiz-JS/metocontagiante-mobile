import axios from 'axios';
const baseURL = process.env.NODE_ENV === 'production' ? 'https://metocontagiante-backend.herokuapp.com/api' : 'http://DESKTOP-DQ2L19K:3001/api';
const api = axios.create({ baseURL });

export default api;