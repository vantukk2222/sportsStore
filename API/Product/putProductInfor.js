import axios from "axios";
import { urlAPI } from "../apiAddress";
const putProdutInfor = async (idProduct, Product, authToken) => {

    //var authToken = await asyncStorage.getAuthToken();

    console.log("token API", authToken);
    console.log("product", Product);
    try {

        const response = await axios.put(
            urlAPI + `/api/v1/product-information/save/${idProduct}`,
            Product,
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
        console.error("error put create product", error.response);
        throw error;
    }
};

export default putProdutInfor;
