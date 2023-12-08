import axios from "axios";

export const setInfor = async (userId, userData, authToken) => {
    console.log('User :', userData)
    try {
        const response = await axios.put(
            `https://project-pbl6-production.up.railway.app/api/v1/user/save/${userId}`,
            userData,
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            }
        );

        console.log('Update User Response:', response);
        return response.status;
    } catch (error) {
        console.error('Error updating user:', error.response);
        throw error;
    }
};
