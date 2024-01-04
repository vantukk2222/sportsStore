import axios from 'axios';
import { api } from './url';
const deleteSale = async (id, authToken) => {
    try {
        const response = await axios.delete(`${api}sale/delete/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        });
    } catch (error) {
        console.error('Error fetching data - Get group category: ', error);
        throw error;
    }
};

export default deleteSale;
