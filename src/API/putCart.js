import axios from 'axios';
import { api } from './url';
const putCart = async (id, quantity, authToken) => {
    try {
        await axios({
            method: 'put',
            url: `${api}cart/change-quantity/${id}?quantity=${quantity}`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
    } catch (error) {
        console.error('error sign in' + error.message);
    }
};

export default putCart;
