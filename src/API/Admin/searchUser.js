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
                'Content-Type': 'application/json',
            },
        });
       
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default searchUser;
