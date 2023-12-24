import axios from 'axios';
import { api } from './url';
const getUnAuth = async (prop) => {
    try {
        //  console.log(api + prop);
        const response = await axios.get(api + prop);
        // console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching data - Get group category: ', error);
        console.log('Error response from server:', error.response);
        throw error;
    }
};

export default getUnAuth;
