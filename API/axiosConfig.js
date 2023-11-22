import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/reducers/Login/signinReducer';
import { toastError, toastsuccess } from '../assets/components/toastCustom';

const axiosInstance = axios.create({
  baseURL: 'https://project-pbl6-production.up.railway.app/api/v1', // Thay đổi URL dựa trên API của bạn
  headers: {
    'Content-Type': 'application/json',
    'accept': '*/*'
  }
});

// Thiết lập interceptors để thêm hoặc xử lý thông tin trước hoặc sau mỗi yêu cầu Axios

// Interceptor trước khi gửi yêu cầu


// Interceptor sau khi nhận phản hồi
axiosInstance.interceptors.response.use(
  (response) => {
    // Xử lý phản hồi nếu cần
    return response;
  },
  (error) => {
    
    store.dispatch(logout())
    toastError("Thời gian đăng nhập hết hạn", "Vui lòng đăng nhập lại")
    setHeaderToken('');
    // Xử lý lỗi nếu cần
    return Promise.reject(error);
  }
);
export const setHeaderToken = (token) => {
    console.log("TOKEN set axios:", token);
    if(token) {
        axiosInstance.defaults.headers.common.Authorization =  token ? `Bearer ${token}`: ''
    } else {
        delete axiosInstance.defaults.headers.common.Authorization;
    }
}
export default axiosInstance;
