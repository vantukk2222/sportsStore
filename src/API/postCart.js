import axios from 'axios';
import { api } from './url';
const postCart = async (id_user, id_product, quantity, authToken = '') => {
    try {
        //console.log(id_user, id_product, quantity);
        // console.log(authToken);
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
        console.log('error sign in' + error.message);
    }
};

export default postCart;
