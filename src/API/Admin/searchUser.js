import axios from 'axios';
import { api } from '~/API/url';

const searchUser = async (name, page, pageSize, sort, desc, state) => {
    try {
        const response = await axios.get(api + 'user/search', {
            params: {
                name: name,
                page: page,
                page_size: pageSize,
                sort: sort,
                desc: desc,
                state: state,
            },
            headers: {
                // 'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });

        // console.log('call API get product ', response);
        return response.data;
    } catch (error) {
        //  console.error('Error fetching data: ', error);
        // console.log(error.response);
        throw error;
    }
};

export default searchUser;
