import axios from 'axios'

export const api = axios.create({
    baseURL:'https://backend-escala-barueri-semurb.vercel.app',
    timeout: 10000
})
export default api;