import axios from "axios";
import { asyncStorage } from "../../utilies/asyncStorage";
const getProductByCategory = async (idCate, page, pageSize, sort, desc) => {
    //var authToken = await asyncStorage.getAuthToken();
    // console.log(authToken);
    // https://project-pbl6-production.up.railway.app/api/v1/product/find-by-category/18?page=0&page_size=10&sort=name&desc=true
    try {
        const response = await axios.get(`https://project-pbl6-production.up.railway.app/api/v1/product/find-by-category/${idCate}`, {
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

        console.log('call API get product by category');
        return response.data;
    } catch (error) {
        console.error(error.response.data.message);
        throw error;
    }
};

export default getProductByCategory;
