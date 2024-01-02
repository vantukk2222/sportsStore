import axios from "axios";
import { urlAPI } from "../apiAddress";

const getCommentByID = async (id_product_infor,page) => {
    try {
        // console.log("Username in API: ", userName);
        const response = await axios.get(urlAPI + `/api/v1/comment/find-by-product/${id_product_infor}?page${page}0&page_size=15&sort=created_at&desc=false`, {
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
        });
        // console.log("get User DONE: ", response.data)
        return response;
    } catch (error) {
        // console.error('Error get data User: ', error.response);
        throw error;
    }
};

export default getCommentByID;
