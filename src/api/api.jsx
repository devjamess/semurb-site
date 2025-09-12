import axios from 'axios'

export const api = axios.create({
    basURL:'https://backend-escala-barueri-semurb-4ezy.onrender.com',
    timeout: 10000
})
export default api;