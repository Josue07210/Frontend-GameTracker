import axios from 'axios';

// La URL donde corre mi sv de express
const API_BASE_URL = 'http://localhost:3000/api';

const axiosClient = axios.create({
    baseURL: API_BASE_URL
});

export default axiosClient;