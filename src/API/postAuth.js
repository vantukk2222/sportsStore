import axios from 'axios';
import { api } from './url';
const loginPage = async (email, password) => {
    try {
        const response = await axios.post(
            `${api}auth/signin`,
            {
                username: email,
                password: password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error('error sign in' + error.message);
    }
};

export default loginPage;
