import axios from 'axios';
import { api } from './url';
const getUnAuth = async (prop) => {
    try {
        const response = await axios.get(api + prop);
        return response.data;
    } catch (error) {
        console.error('Error fetching data - Get group category: ', error);
        throw error;
    }
};

export default getUnAuth;
