import axios from 'axios';
import { api } from './url';

export const postSProductInformation = async (id, ids, authToken) => {
    try {
        await axios({
            method: 'post',
            url: `${api}product-information/add-sale-product-information/${id}`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            data: ids,
        });
    } catch (error) {
        console.error('Error updating product:', error);
    }
};
