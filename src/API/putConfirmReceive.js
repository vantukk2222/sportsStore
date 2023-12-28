import axios from 'axios';
import { api } from './url';
const putConfirmReceive = async (id, authToken) => {
    console.log(`${api}bill/confirm-receive/true`, id, authToken);
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
        console.log('error sign in' + error.message);
    }
};

export default putConfirmReceive;
