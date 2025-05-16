import axios from 'axios';

const client = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export default client;
