import axios from 'axios';
import { api } from '../url';

const getUser = async (id) => {
    try {
        const response = await axios.get(api + 'bussiness', {
            params: {
               
            },
        });

        return response.data;
    } catch (error) {
        throw error.response;
    }
};
export default getUser;
