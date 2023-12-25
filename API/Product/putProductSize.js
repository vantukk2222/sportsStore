import axios from "axios";
import { urlAPI } from "../apiAddress";
const putProdutSize = async (idProductSize, ProductSize, authToken) => {

    //var authToken = await asyncStorage.getAuthToken();

    console.log("token API", authToken);
    console.log("product", ProductSize);
    try {

        const response = await axios.put(
            urlAPI + `/api/v1/product/save/${idProductSize}`,
            ProductSize,
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
        console.error("error put  product size", error.response);
        throw error;
    }
};

export default putProdutSize;
