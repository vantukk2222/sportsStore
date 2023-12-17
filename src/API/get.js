import axios from 'axios';

const getUnAuth = async (prop) => {
    try {
        const api = 'https://project-pbl6-production.up.railway.app/api/v1/';
        //  console.log(api + prop);
        const response = await axios.get(api + prop);
        //  console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching data - Get group category: ', error);
        console.log('Error response from server:', error.response);
        throw error;
    }
};

export default getUnAuth;
