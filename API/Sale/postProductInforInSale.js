import axios from "axios";
import { urlAPI } from "../apiAddress";
import { toastError } from "../../components/toastCustom";

const postProductinforInSale = async (saleId, productIds, authToken) => {
    // Chuyển đổi object thành mảng các giá trị
    const productIdsArray = Object.values(productIds);
    try {
        const response = await axios.post(
            urlAPI + `/api/v1/product-information/add-sale-product-information/${saleId}`,
            productIdsArray,
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
        toastError('Lỗi', 'Tạm thời không thể thêm sản phẩm');
        console.error("Error post product in sale", error.response);
        throw error;
    }
};

export default postProductinforInSale;
