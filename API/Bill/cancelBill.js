import axios from "axios";
import { urlAPI } from "../apiAddress";

const cancelBill = async (list_id_bill, authToken,state) => {
    try { 
        
        console.log("user ID in cancelBill API:", list_id_bill);
        console.log("token API", authToken);

        // {"/api/v1/bill/confirm-receive/true"}
        const response = await axios.put(
            urlAPI + `/api/v1/bill/confirm-${state}/true`,
            list_id_bill,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            }
        );

        console.log('Successs cancel bill: ', response.status);
        return response.status;    
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status + " \t" + error.response);
            console.error('Error headers:', error.response.headers);
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
};

export default cancelBill;
