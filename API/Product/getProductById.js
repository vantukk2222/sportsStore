import axios from "axios";
import axiosInstance from "../axiosConfig";

const getProductById = async (id) => {
    try {
        const response = await axiosInstance.get(`/product/${id}`);
        return response.data;
    } catch (error) {
        console.error(error.response.data.message);
        throw error;
    }
};

export default getProductById;
