import axios from "axios";
import { asyncStorage } from "../../utilies/asyncStorage";
import { urlAPI } from "../apiAddress";
const getSaleByDiscount = async (discount_min, discount_max, page, pageSize, sort, desc) => {
    //var authToken = await asyncStorage.getAuthToken();
    // console.log(authToken);
    // https://project-pbl6-production.up.railway.app/api/v1/product/find-by-category/18?page=0&page_size=10&sort=name&desc=true
    try {
        const response = await axios.get(urlAPI + `/api/v1/sale/get-by-discount`, {
            // https://project-pbl6-production.up.railway.app/api/v1/sale/get-by-discount?discount_min=20&discount_max=40&page=0&page_size=5&sort=name&desc=true
            params: {
                discount_min: discount_min,
                discount_max: discount_max,
                page: page,
                page_size: pageSize,
                sort: sort,
                desc: desc,
            }
        });

        // console.log('call API get product by category', response.data.content);

        return response.data;
    } catch (error) {
        console.error("Error get sale by discount: ", error.response.data.message);
        throw error;
    }
};

export default getSaleByDiscount;
