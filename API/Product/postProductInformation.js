import axios from "axios";
import { urlAPI } from "../apiAddress";
export const postProductInformation = async (ProductInfor, authToken) => {
    console.log('authToken :', authToken)
    //console.log('postProductInformation :', ProductInfor)
    try {
        const response = await axios.post(
            urlAPI + `/api/v1/product-information/save`,
            ProductInfor,
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            }
        );

        console.log('product response.data', response.data);
        return response;
    } catch (error) {
        console.error('Error create product information:', error.response);
        throw error;
    }
};
