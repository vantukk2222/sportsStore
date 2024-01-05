import axios from 'axios';
import { api } from './url';

const checkToken = async (authToken) => {
    try {
        const response = await axios.get(api + 'test', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response;
    } catch (error) {
        return error.response;
        //throw error.response;
    }
};
export default checkToken;
