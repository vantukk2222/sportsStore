import axios from 'axios';
import { api } from './url';
const postRegister = async (data) => {
    try {
        console.log(data);
        const response = await axios.post(
            `${api}auth/signup-customer`,
            {
                username: data.username,
                password: data.password,
                name: data.name,
                phone: data.phone,
                email: data.email,
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
        console.log('error sign in' + error.message);
    }
};

export default postRegister;
