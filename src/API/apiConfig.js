import axios, { Axios } from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api/v1', // Updated to match the proxy path
    headers: {
        'Content-Type': 'application/json',
        'accept': '/'
    }
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // toastError("Thời gian đăng nhập hết hạn", "Vui lòng đăng nhập lại");
        setHeaderToken();
        // store.dispatch(logout());
        return Promise.reject(error);
    }
);


export const setHeaderToken = (token) => {
    console.log("TOKEN set axios:", token);
    if (token) {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common.Authorization;
    }
}

export default axiosInstance;