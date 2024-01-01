import axios from "axios";
import { urlAPI } from "../apiAddress";
import { toastError } from "../../components/toastCustom";

const putChangeInfor = async (businessId, business, authToken) => {
    // Chuyển đổi object thành mảng các giá trị
    try {
        const response = await axios.put(
            urlAPI + `/api/v1/business/save/${businessId}`,
            business,
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    'accept': '*/*',
                },
                // body: {
                //     set_id_product_inf: productIdsArray
                // }
            }
        );

        //console.log(' Response:', response.status);
        return response.status;
    } catch (error) {
        toastError('Lỗi', 'Tạm thời không thể xóa sản phẩm');
        // console.error("Error pit rremove product in sale", error.response);
        throw error;
    }
};

export default putChangeInfor;
