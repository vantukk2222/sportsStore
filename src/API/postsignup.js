import axios from 'axios';
import { api } from './url';
const postRegister = async (data, role) => {
    let response = '';
    try {
        response = await axios.post(`${api}auth/${role}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('error sign in' + error.message);
    }
};

export default postRegister;
