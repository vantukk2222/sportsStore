import axios from "axios";

const getProductById = async (id) => {
    try {
        const response = await axios.get(`https://project-pbl6-production.up.railway.app/api/v1/product/${id}`);
        return response.data;
    } catch (error) {
        console.error(error.response.data.message);
        throw error;
    }
};

export default getProductById;
