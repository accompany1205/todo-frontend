import axios from 'axios';
import config from './config.js';
const AxiosInstance = axios.create({
    baseURL: config.baseApiUrl
})

export default AxiosInstance;
