//https://project-pbl6-production.up.railway.app/api/v1/product-information/search-with-sale/2 ? name = giay & page=0 & page_size=5 & sort=name & desc=true & state=0
import axios from "axios";
import { asyncStorage } from "../../utilies/asyncStorage";
const searchProductInSale = async (idSale, name, state) => {
    // var authToken = await asyncStorage.getAuthToken();
    try {
        const response = await axios.get(`https://project-pbl6-production.up.railway.app/api/v1/product-information/search-with-sale/${idSale}`, {
            params: {
                name: name,
                page: 0,
                page_size: 20,
                sort: 'name',
                desc: true,
                state: state
            }

        });
        // console.log('call API search ');
        return response.data;
    } catch (error) {
        console.error('Error fetching product of sale: ', error);
        console.log(error.response);
        throw error;
    }
};

export default searchProductInSale;
