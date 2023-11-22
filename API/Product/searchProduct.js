import axios from "axios";
import axiosInstance from "../axiosConfig";

const searchProduct = async (name, state) => {
    try {
        const response = await axiosInstance.get('product/search', {
            params: {
                name: name,
                state: state
            },
        });
        console.log('call API search ');
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
};

export default searchProduct;
