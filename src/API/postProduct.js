import axios from 'axios';
import { api } from './url';
const postProduct = async (id, product, authToken) => {
    try {
        const response = await axios.post(
            `${api}product/save`,
            {
                id_product_information: id,
                price: product.price,
                size: product.size,
                quantity: product.quantity,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            },
        );
        return response;
    } catch (error) {
        console.error('error sign in' + error.message);
    }
};

export default postProduct;
