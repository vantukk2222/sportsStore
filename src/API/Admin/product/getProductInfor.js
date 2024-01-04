import axios from 'axios';
import { api } from '~/API/url';

const getProductInfor = async (page, pageSize, sort, desc, state) => {
    try {
        const response = await axios.get(api + 'product-information', {
            params: {
                page: page,
                page_size: pageSize,
                sort: sort,
                desc: desc,
                state: state,
                state_business: 0,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        return response.data;
    } catch (error) {
        //  console.error('Error fetching data: ', error);
        throw error;
    }
};

export default getProductInfor;
