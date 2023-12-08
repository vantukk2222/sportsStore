import axios from "axios";
import { urlAPI } from "../apiAddress";

const getCategory = async (page, pageSize, sort, desc) => {
    try {
        const response = await axios.get(urlAPI+'/api/v1/category', {
            params: {
                page: page,
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
