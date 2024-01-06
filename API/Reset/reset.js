import axios from "axios";
import { urlAPI } from "../apiAddress";
export const resetPasswordAPI = async (email) => {
    try {
        const response = await axios.post('https://project-pbl6-production.up.railway.app/api/v1/auth/forgot-password-sender/'+email);

        if (response.status === 202) {
            console.log('Password reset email sent successfully.');
            return response.status

        } else {
            console.log('Unknown error occurred.');

        }

    } catch (error) {
        if (error.response) {
            // Trường hợp phản hồi có status code 404
            if (error.response.status === 404) {
                console.log('Email not found.');
                
            } else {
                console.log('Unknown error occurred.');
            }
        } else {
            console.error('Request failed:', error.message);
        }
    }
}
