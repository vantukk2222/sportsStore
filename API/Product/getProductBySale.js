import axios from "axios";
import { asyncStorage } from "../../utilies/asyncStorage";
import { urlAPI } from "../apiAddress";
const getProductBySale = async (idSale, page, pageSize, sort, desc, state) => {
    try {
        const response = await axios.get(urlAPI+`/api/v1/product-information/find-by-sale/${idSale}`, {
            // headers: {

            params: {
                page: page,
                pageSize: pageSize,
                sort: sort,
                desc: desc,
                state: state
            }
            //     'Authorization': `Bearer ${authToken}`,
            //     'Content-Type': 'application/json',
            // },
        });

        // console.log('call API get product by category', response.data.content);

        return response.data;
    } catch (error) {
        console.error("Error get product by sale: ", error.response.data.message);
        throw error;
    }
};

export default getProductBySale;
