import axios from 'axios';
import { api } from '../url';

const getUser = async (page, pageSize, sort, desc, state) => {
    try {
        const response = await axios.get(api + 'user', {
            params: {
                page: page,
                page_size: pageSize,
                sort: sort,
                desc: desc,
                state: state,
            },
        });
       
        return response.data;
    } catch (error) {
        throw error.response;
    }
};
export default getUser;
