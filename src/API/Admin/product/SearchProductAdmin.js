import axios from 'axios';
import { api } from '~/API/url';

const SearchProductAdmin = async (name, page, pageSize, sort, desc, state) => {
    try {
        console.log('Search parameters:', name, page, pageSize, sort, desc, state);

        const response = await axios.get(api + 'product-information/search', {
            params: {
                name: name,
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

        console.log('API response:', response);

        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
};

export default SearchProductAdmin;
