import axios from "axios";
import { urlAPI } from "../apiAddress";
export const postProductSize = async (ProductSize, authToken) => {
    // console.log('authToken :', authToken)
    console.log('ProductSize :', ProductSize)
    try {
        const response = await axios.post(
            urlAPI + `/api/v1/product/save`,
            ProductSize,
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            }
        );

        console.log('ProductSize response.data', response);
        return response;
    } catch (error) {
        console.error('Error create ProductSize :', error.response);
        throw error;
    }
};
