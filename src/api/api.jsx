import axios from 'axios'

export const api = axios.create({
    baseURL:'https://backend-escala-barueri-semurb.vercel.app',
    timeout: 10000
})
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // ou AsyncStorage no React Native
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;