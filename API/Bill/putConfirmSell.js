import axios from "axios";
import { urlAPI } from "../apiAddress";
const putConfirmSell = async (isConfirm, listSell, authToken) => {

    //var authToken = await asyncStorage.getAuthToken();
    console.log("token API", authToken);
    try {
        const response = await axios.put(urlAPI + `/api/v1/bill/confirm-sell/${isConfirm}`, listSell, {
            headers: {
                'Content-Type': 'application/json',
                'accept': '/',
                'Authorization': `Bearer ${authToken}`
            }
        }
        );

        // const response = await axios.put(
        //     urlAPI + `/api/v1/product-information/change-state/${id}?state=${state}`,
        //     {},
        //     {
        //         headers: {
        //             'Authorization': `Bearer ${authToken}`,
        //             'Content-Type': 'application/json',
        //             'accept': '*/*'
        //         },
        //     }
        // );


        console.log('response confirm', response);
        return response.status;
    } catch (error) {
        console.error("error put change state", error.response);
        throw error;
    }
};

export default putChangeState;
