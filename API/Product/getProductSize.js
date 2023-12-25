import axios from "axios";
import { asyncStorage } from "../../utilies/asyncStorage";
import { urlAPI } from "../apiAddress";
const getProductSize = async (idProductinfor) => {
    try {
        const response = await axios.get(urlAPI + `/api/v1/product/get-by-id-product-information/${idProductinfor}`);

        //console.log('call API get product by sale', response.data.content, idSale);

        return response.data;
    } catch (error) {
        console.error("Error get product by sale: ", error.response.data.message);
        throw error;
    }
};

export default getProductSize;
