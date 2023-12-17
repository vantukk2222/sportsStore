import axios from "axios";
import { urlAPI } from "../apiAddress";
const putChangeState = async (id, state, authToken) => {

    //var authToken = await asyncStorage.getAuthToken();
    console.log("token API", authToken);
    try {

        const response = await axios.put(
            urlAPI + `/api/v1/product-information/change-state/${id}?state=${state}`,
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
        return response.status;
    } catch (error) {
        console.error("error put change state", error.response);
        throw error;
    }
};

export default putChangeState;
