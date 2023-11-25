import axios from "axios";

const getUserByUserName = async (userName) => {
    try {
        // console.log("Username in API: ", userName);
        const response = await axios.get(`https://project-pbl6-production.up.railway.app/api/v1/user/get-by-username/${userName}`, {
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
        });
        // console.log("get User DONE: ", response.data)
        return response.data;
    } catch (error) {
        console.error('Error get data User: ', error);
        throw error;
    }
};

export default getUserByUserName;
