import axios from "axios";
import { BACKEND_BASE_URL } from "../contants";

const axiosInstance = axios.create({
    baseURL: BACKEND_BASE_URL,
    withCredentials: true,
});

// Adicione um interceptador para incluir o token nas requisições
axiosInstance.interceptors.request.use(config => {
    const userInfo = localStorage.getItem('userInfo'); // Obtenha os dados do userInfo
    let token = null;

    if (userInfo) {
        const parsedUserInfo = JSON.parse(userInfo);
        token = parsedUserInfo.token; // Extraia o token do objeto userInfo
    }

    if (token) {
        config.headers.Authorization = `${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;

