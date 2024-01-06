import axios from 'axios';
import { api } from './url';

export const postforgotpassword = async (email) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${api}auth/forgot-password-sender/${email}`,
        });
    } catch (error) {
        return error.response;
    }
};
