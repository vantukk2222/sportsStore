import axios from "axios";
import { urlAPI } from "../apiAddress";

export const postComment = async (Comment, authToken) => {
    console.log('Comment API:', Comment)
    try {
        const response = await axios.post(
            urlAPI + `/api/v1/comment/save`,
            Comment,
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            }
        );
        // console.log('Update Comment Response:', response.data);
        return response;
    } catch (error) {
        console.error('Error updating Comment:', error.response);
        throw error;
    }
};
