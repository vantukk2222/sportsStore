import axios from 'axios';
import { api } from './url';
const putConfirmReceive = async (id, authToken) => {
    try {
        await axios({
            method: 'put',
            url: `${api}bill/confirm-receive/true`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            data: [id],
        });
    } catch (error) {
        console.error('error sign in' + error.message);
    }
};

export default putConfirmReceive;
