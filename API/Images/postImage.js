import axios from "axios";
import { urlAPI } from "../apiAddress";
export const postImage = async (Images, authToken) => {
    console.log('image :', Images)
    try {
        const response = await axios.post(
            urlAPI + `/api/v1/image/save`,
            Images,
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            }
        );
        console.log('Update Image Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating image:', error.response);
        throw error;
    }
};
