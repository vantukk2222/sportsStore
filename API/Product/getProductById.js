import axios from "axios";
import axiosInstance from "../axiosConfig";

const getProductById = async (id) => {
    try {

        const response = await axiosInstance.get(`/product/${id}`);
        console.log('API', response.data)
        return response.data;
    } catch (error) {
        console.error(error.response.data.message);
        throw error;
    }
};

export default getProductById;
