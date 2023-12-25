import axios from "axios";
import { asyncStorage } from "../../utilies/asyncStorage";
import { urlAPI } from "../apiAddress";
const getSalebyId = async (idSale) => {
    try {
        const response = await axios.get(urlAPI + `/api/v1/sale/${idSale}`);
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error get sale by id: ", error.response.data.message);
        throw error;
    }
};

export default getSalebyId;
