import axios from "axios";
import { urlAPI } from "../apiAddress";

const getBusinessInformation = async (id_business) => {
    try {
        // console.log("Username in API: ", userName);
        const response = await axios.get(urlAPI + `/api/v1/business/${id_business}`, {
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
        });
        // console.log("get User DONE: ", response.data)
        return response.data;
    } catch (error) {
        // console.error('Error get data User: ', error.response);
        throw error;
    }
};

export default getBusinessInformation;
