import axios from "axios";
import { asyncStorage } from "../../utilies/asyncStorage";
import { urlAPI } from "../apiAddress";
const getProductByBusiness = async (idBusi, page, pageSize, sort, desc, state) => {
    // console.log(idBusi, page, pageSize, sort, desc, state);
    try {
        const response = await axios.get(urlAPI + `/api/v1/product-information/find-by-business/${idBusi}`, {
            // headers: {
            params: {
                page: page,
                page_size: pageSize,
                sort: sort,
                desc: desc,
                state: state,
            }
            //     'Authorization': `Bearer ${authToken}`,
            //     'Content-Type': 'application/json',
            // },
        });

        // console.log('call API get product by category', response.data.content);

        return response.data;
    } catch (error) {
        console.error("Error get product by business: ", error.response);
        throw error;
    }
};

export default getProductByBusiness;
