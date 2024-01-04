import axios from 'axios';
import { api } from './url';
const deleteCart = async (prop, authToken) => {
    try {
        const response = await axios.delete(`${api}cart/delete/${prop}`, {
            headers: {
                'Content-Type': 'application/json',
                accept: '*/*',
                Authorization: `Bearer ${authToken}`,
            },
        });
    } catch (error) {
        console.error('Error fetching data - Get group category: ', error);
    }
};

export default deleteCart;
