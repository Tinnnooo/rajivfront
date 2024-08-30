import axios from "axios";

const URL = `http://127.0.0.1:8000/api/`

const axiosClient = axios.create({
    baseURL: URL
})

axiosClient.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

axiosClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const {response} = error;
        if (response && response.status === 401 && response.data.message === 'Unauthorized user') {
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)

export default axiosClient;
