import axios from "axios";
import { urlAPI } from "../apiAddress";
const getAllSales = async (page, pageSize) => {
    try {
        const response = await axios.get(urlAPI+'/api/v1/sale', {
            params: {
                page: page,
                page_size: pageSize,
                sort: 'discount',
                desc: true
            },

        });

        // console.log('call API get product ', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching data getAllSale: ', error);
        // console.log(error.response);
        throw error;
    }
};

export default getAllSales;
