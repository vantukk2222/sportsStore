import axios from "axios";
import { urlAPI } from "../apiAddress";
export const deleteProductInformation = async (idPro, authToken) => {
    // console.log('authToken :', authToken)

    try {
        const response = await axios.delete(
            urlAPI + `/api/v1/product-information/delete/${idPro}`,
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            }
        );

        console.log('Delete product information', response);
        return response;
    } catch (error) {
        console.error('Error Delete product information :', error.response);
        throw error;
    }
};
