import axios from "axios";
import { asyncStorage } from "../../utilies/asyncStorage";
import { urlAPI } from "../apiAddress";
const getSalebyIdBusiness = async (idBusi, page, pageSize, sort, desc) => {
    //var authToken = await asyncStorage.getAuthToken();
    // console.log(authToken);
    // https://project-pbl6-production.up.railway.app/api/v1/product/find-by-category/18?page=0&page_size=10&sort=name&desc=true
    try {
        const response = await axios.get(urlAPI + `/api/v1/sale/get-by-business${idBusi}`, {
            // https://project-pbl6-production.up.railway.app/api/v1/sale/get-by-business2?page=0&page_size=10&sort=discount&desc=true
            params: {
                page: page,
                pageSize: pageSize,
                sort: sort,
                desc: desc,
            }
        });

        // console.log('call API get product by category', response.data.content);

        return response.data;
    } catch (error) {
        console.error("Error get sale by business: ", error.response.data.message);
        throw error;
    }
};

export default getSalebyIdBusiness;
