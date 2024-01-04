import axios from 'axios';
import { api } from './url';

export const putUHproduct = async (id, check, authToken) => {
    try {
        await axios({
            method: 'put',
            url: `${api}product-information/hide-product-information/${id}?hide=${check}`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
    } catch (error) {
        console.error('Error updating sale:', error);
    }
};
