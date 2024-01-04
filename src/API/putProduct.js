import axios from 'axios';
import { api } from './url';
const putProduct = async (id, product, authToken) => {
    try {
        await axios({
            method: 'put',
            url: `${api}product/save/${product.id}`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            data: {
                id_product_information: id,
                price: product.price,
                size: product.size,
                quantity: product.quantity,
            },
        });
    } catch (error) {
        console.error('error sign in' + error.message);
    }
};

export default putProduct;
