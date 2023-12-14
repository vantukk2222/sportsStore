import axios from "axios";
import { asyncStorage } from "../../utilies/asyncStorage";
import { urlAPI } from "../apiAddress";
const getProductByCategory = async (idCate, page, pageSize, sort, desc) => {
    try {
        const response = await axios.get(urlAPI + `/api/v1/product-information/find-by-category/${idCate}`, {
            // headers: {
            params: {
                page: page,
                pageSize: pageSize,
                sort: sort,
                desc: desc
            }
            //     'Authorization': `Bearer ${authToken}`,
            //     'Content-Type': 'application/json',
            // },
        });

        // console.log('call API get product by category', response.data.content);

        return response.data;
    } catch (error) {
        //console.error("Error get product by category: ", error.response.data.message);
        throw error;
    }
};

export default getProductByCategory;
