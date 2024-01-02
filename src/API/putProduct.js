import axios from 'axios';
import { api } from './url';

export const putProduct = async (productId, productData, authToken) => {
   // console.log('Product :', productData);
    try {
        await axios({
            method: 'put',
            url: `${api}product-information/save/${productId}`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            data: productData,
        });
    } catch (error) {
        console.error('Error updating product:', error);
    }
};
