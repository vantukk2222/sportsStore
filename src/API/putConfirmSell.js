import axios from 'axios';
import { api } from './url';
const putConfirmSell = async (id, sell, authToken) => {
    try {
        await axios({
            method: 'put',
            url: `${api}bill/confirm-sell/${sell}`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            data: [id],
        });
    } catch (error) {
        console.error('error sign in' + error.message);
    }
};

export default putConfirmSell;
