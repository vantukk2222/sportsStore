import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/reducers/Login/signinReducer';
import { toastError, toastsuccess } from '../assets/components/toastCustom';
import { Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  baseURL: 'https://project-pbl6-production.up.railway.app/api/v1', // Thay đổi URL dựa trên API của bạn
  headers: {
    'Content-Type': 'application/json',
    'accept': '*/*'
  }
});

// Thiết lập interceptors để thêm hoặc xử lý thông tin trước hoặc sau mỗi yêu cầu Axios

// Interceptor trước khi gửi yêu cầu

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
// Interceptor sau khi nhận phản hồi
axiosInstance.interceptors.response.use(
  (response) => {
    // await delay(1500);
    // if (response.status === 200) {
    //   Alert.alert("Status 200 nha em")
    // } else if(response.status === 400)
    // {
    //   Alert.alert("Loi 400 nha em")
    // } else if(response.status === 403)
    // {
    //   Alert.alert("Loi 403 nha em")
    // }
    //  else if (response.status === 404) {
    //   Alert.alert("Loi 404 nha em")
    // }
    return response;
  },

   (error) => {
    Alert.alert("loi roi nha", String(error))
    
    toastError("Thời gian đăng nhập hết hạn", "Vui lòng đăng nhập lại")
    // setHeaderToken('');
    // store.dispatch(logout())
    // await AsyncStorage.removeItem('persist:root')
    
    // store.dis
    // console.log("data product axios cofig: ",store.getState.product)
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
