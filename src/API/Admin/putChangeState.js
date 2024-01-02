//https://project-pbl6-production.up.railway.app/api/v1/user/change-state/1?state=0
import axios from "axios";
import { api } from "../url";
const putChangeState = async (id, state,authToken) => {

    //var authToken = await asyncStorage.getAuthToken();
    //console.log("token API", authToken);
    try {

        const response = await axios.put(
            api + `user/change-state/${id}?state=${state}`,
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

export default putChangeState;
