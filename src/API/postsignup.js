import axios from 'axios';
import { api } from './url';
const postRegister = async (data) => {
    try {
        const response = await axios.post(`${api}auth/signup`, data, {
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
        });
        return response.data;
    } catch (error) {
        console.log('error sign in' + error.message);
    }
};

export default postRegister;
