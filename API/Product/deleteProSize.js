import axios from "axios";
import { urlAPI } from "../apiAddress";
import { toastsuccess } from "../../components/toastCustom";
export const deleteProSize = async (idProSize, authToken) => {
    // console.log('authToken :', authToken)

    try {
        const response = await axios.delete(
            urlAPI + `/api/v1/product/delete/${idProSize}`,
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            }
        );

        console.log('Delete product size', response.status);
        return response.status;
    } catch (error) {
        console.error('Error Delete product size :', error.response);
        throw error;
    }
};
