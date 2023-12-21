import axios from 'axios';
import { api } from './url';
const putCart = async (id, quantity, authToken) => {
    try {
        console.log(authToken);
        await axios.put(`${api}cart/change-quantity/${id}?quantity=${quantity}`, {
            headers: {
                'Content-Type': 'application/json',
                accept: '*/*',
                Authorization: `Bearer ${authToken}`,
            },
        });
    } catch (error) {
        console.log('error sign in' + error.message);
    }
};

export default putCart;
