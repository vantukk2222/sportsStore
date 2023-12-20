import axios from 'axios';
import { api } from './url';
const deleteCart = async (prop) => {
    try {
        const response = await axios.delete(`${api}cart/delete/${prop}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
        });
    } catch (error) {
        console.error('Error fetching data - Get group category: ', error);
        console.log('Error response from server:', error.response);
        throw error;
    }
};

export default deleteCart;
