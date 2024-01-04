import axios from "axios";
import { urlAPI } from "../apiAddress";

export const setInfor = async (userId, userData, authToken) => {
    console.log('User :', userData)
    try {
        const response = await axios.put(
            urlAPI + `/api/v1/user/save/${userId}`,
            userData,
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            }
        );

        console.log('Update User Response:', response.data  );
        return response.status;
    } catch (error) {
        console.error('Error updating user:', error.response);
        throw error;
    }
};
