import axios from 'axios';
import { api } from './url';

export const putRemoveSale = async (ids, authToken) => {
    try {
        await axios({
            method: 'put',
            url: `${api}product-information/remove-sale-product-information`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            data: ids,
        });
    } catch (error) {
        console.error('Error updating sale:', error);
    }
};
