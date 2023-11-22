import axios from "axios";

import axiosInstance from "../axiosConfig";
const delayRequest = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
const getProductById = async (id) => {
  // var authToken = await asyncStorage.getAuthToken();
  // console.log(authToken);
  try {
    await delayRequest(1500); // Chờ 1.5 giây trước khi gọi API
    const response = await axiosInstance.get(`/product/${id}`);
    console.log('API', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      // Nếu server trả về thông báo lỗi, in ra thông báo lỗi đó
      console.error("Error detail product: " + error.response.data.message);
    } else {
      // Nếu không có thông báo lỗi cụ thể từ server, in ra lỗi chung
      console.error("General error:", error);
    }
    throw error; // Để cho phép mã gọi getProductById có thể xử lý lỗi tiếp theo nếu cần thiết
  }
};

export default getProductById;
