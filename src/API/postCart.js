import axios from 'axios';
import { api } from './url';
const postCart = async (id_user, id_product, quantity, authToken = '') => {
    try {
        await axios.post(
            `${api}cart/save`,
            {
                id_user: id_user,
                id_product: id_product,
                quantity: quantity,
            },

            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: '*/*',
                    Authorization: `Bearer ${authToken}`,
                },
            },
        );
    } catch (error) {
        console.error('error sign in' + error.message);
    }
};

export default postCart;
