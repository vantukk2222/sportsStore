import axios from "axios";
import { urlAPI } from "../apiAddress";
import { toastError, toastsuccess } from "../../components/toastCustom";

const savePaymentAPI = async (method_payment, list_id, authToken) => {
  console.log("payment MOMOAPI:", method_payment, list_id, authToken);
    try {
        if (!authToken) {
          toastError("Xin chào","Phiên đăng nhập đã hết hạn")
            throw new Error("Missing authToken"); // Kiểm tra authToken trước khi gửi request
        }
        const response = await axios.post(urlAPI+`/api/v1/cart/buy-with-momo?requestType=${method_payment}`,list_id, {
          headers: {
            'Content-Type': 'application/json',
            'accept': '*/*',
            'Authorization': `Bearer ${authToken}` 
          }
        });
    
        console.log("link: ",response.data); // Log response data

        // Kiểm tra response và hiển thị thông báo phù hợp
        if (response.status === 200) {
            toastsuccess('Thành công',"Thanh toán thành công");
            return response.data
        } else {
          toastError("Thất bại","Thanh toán thất bại");
          throw new Error("Something went wrong!!!")
        }
    } catch (error) {
      console.error('Error:', error );
  
      // Kiểm tra nếu lỗi là 401 Unauthorized và có response từ server
      if (error.response && error.response.status === 401) {
        console.error("Lỗi", "Yêu cầu xác thực không thành công");
      } else {
        console.error("Xin lỗi", "Đã có lỗi xảy ra khi thanh toán bằng MOMO");
      }
      
      throw new Error("Something went wrong with server!!!");
    }
};

export default savePaymentAPI;
