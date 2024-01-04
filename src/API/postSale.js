import axios from 'axios';
import { api } from './url';

export const postSale = async (saleData, authToken) => {
    try {
        await axios({
            method: 'post',
            url: `${api}sale/save`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            data: saleData,
        });
    } catch (error) {
        console.error('Error updating sale:', error);
    }
};
