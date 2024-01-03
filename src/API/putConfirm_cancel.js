import axios from 'axios';
import { api } from './url';
const putConfirm_cancel = async (id, authToken) => {
    console.log(id, authToken);
    try {
        await axios({
            method: 'put',
            url: `${api}bill/confirm-cancel/true`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            data: id,
        });
    } catch (error) {
        console.log('error sign in' + error.message);
    }
};

export default putConfirm_cancel;
