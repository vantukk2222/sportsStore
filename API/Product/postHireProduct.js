import axios from "axios";
import { urlAPI } from "../apiAddress";
import { toastError } from "../../components/toastCustom";
const postHireProduct = async (id, hide, authToken) => {

    //var authToken = await asyncStorage.getAuthToken();
    console.log("token API", authToken);
    try {

        const response = await axios.put(
            urlAPI + `/api/v1/product-information/hide-product-information/${id}?hide=${hide}`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            }
        );


        console.log('response state', response);
        return response;
    } catch (error) {
        //console.error("error put change state", error.response.status);
        // if (error.response.status === 401) {
        //     toastError('Lổi', 'Vui lòng kiểm tra đăng nhập')
        // }
        throw error;
    }
};

export default postHireProduct;
