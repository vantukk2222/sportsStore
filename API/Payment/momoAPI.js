import axios from "axios";
import { Alert } from "react-native";
import { urlAPI } from "../apiAddress";
import { toastError, toastsuccess } from "../../components/toastCustom";

const savePaymentAPI = async (id_user, authToken) => {
    try {
        if (!authToken) {
          toastError("Xin chào","Phiên đăng nhập đã hết hạn")
            throw new Error("Missing authToken"); // Kiểm tra authToken trước khi gửi request
        }

        const response = await axios.post(urlAPI+`/api/v1/cart/momo?id_user=${id_user}`,
        {}, {
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
        console.error('Error:', error);
        toastError("Xin lỗi", "Đã có lỗi xảy ra khi thanh toán bằng MOMO")
        throw new Error("Something went wrong with server!!!")

        // Alert.alert("An error occurred while saving payment");
    }
};

export default savePaymentAPI;
