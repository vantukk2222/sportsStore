import axios from 'axios';
import { api } from './url';
const putConfirmSell = async (id, sell, authToken) => {
    console.log(`${api}bill/confirm-sell/true`, id, authToken);
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
        console.log('error sign in' + error.message);
    }
};

export default putConfirmSell;
