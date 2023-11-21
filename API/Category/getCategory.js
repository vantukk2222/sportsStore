import axios from "axios";
import axiosInstance from "../axiosConfig";

const getCategory = async (pageSize, sort, desc) => {
    try {
        const response = await axiosInstance.get('/category', {
            params: {
                page_size: pageSize,
                sort: sort,
                desc: desc
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
};

export default getCategory;
