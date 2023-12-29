import axios from 'axios';
import { api } from './url';
const putConfirmSell = async (id, authToken) => {
    //console.log(`${api}bill/confirm-receive/true`, id, authToken);
    try {
        await axios({
            method: 'put',
            url: `${api}bill/confirm-sell/true`,
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
