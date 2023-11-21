import axios from "axios";
import axiosInstance from "../axiosConfig";

const getProduct = async (page, pageSize, sort, desc) => {
    try {
        const response = await axiosInstance.get('/category', {
            params: {
                page: page,
                page_size: pageSize,
                sort: sort,
                desc: desc
            },
        });
        return response.data.content;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
};

export default getProduct;
