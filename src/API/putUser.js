import axios from 'axios';
import { api } from './url';

export const putUser = async (userId, userData, authToken) => {
    console.log('User :', userData);
    try {
        await axios({
            method: 'put',
            url: `${api}user/save/${userId}`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            data: userData,
        });
    } catch (error) {
        console.error('Error updating user:', error);
    }
};
