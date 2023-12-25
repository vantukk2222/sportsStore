import axios from "axios";
import { urlAPI } from "../apiAddress";
const putSale = async (Idsale, sale, authToken) => {

    //var authToken = await asyncStorage.getAuthToken();
    console.log("token API", authToken);
    try {

        const response = await axios.put(
            urlAPI + `/api/v1/sale/save/${Idsale}`,
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

export default putSale