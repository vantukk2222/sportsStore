import axios from "axios";
import { urlAPI } from "../apiAddress";
const putChangeIsmain = async (id, authToken) => {

    //var authToken = await asyncStorage.getAuthToken();
    console.log("token API", authToken);
    try {

        const response = await axios.put(
            urlAPI + `/api/v1/image/change-is-main/${id}`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            }
        );


        console.log('response state', response.status);
        return response.status;
    } catch (error) {
        console.error("error put change state", error.response.status);
        throw error;
    }
};

export default putChangeIsmain;
