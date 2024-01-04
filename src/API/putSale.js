import axios from 'axios';
import { api } from './url';

export const putSale = async (saleId, saleData, authToken) => {
    try {
        await axios({
            method: 'put',
            url: `${api}sale/save/${saleId}`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            data: saleData,
        });
    } catch (error) {
        console.error('Error updating sale:', error);
    }
};
