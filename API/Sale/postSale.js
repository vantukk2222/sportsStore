import axios from "axios";
import { urlAPI } from "../apiAddress";
const postSale = async (sale, authToken) => {

    //var authToken = await asyncStorage.getAuthToken();
    console.log("token API", authToken);
    try {

        const response = await axios.post(
            urlAPI + `/api/v1/sale/save`,
            sale,
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
        console.error("error post sale", error.response);
        throw error;
    }
};

export default postSale;
