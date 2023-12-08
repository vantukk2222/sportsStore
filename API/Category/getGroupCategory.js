import axios from "axios";
import { asyncStorage } from "../../utilies/asyncStorage";
import { urlAPI } from "../apiAddress";

const getGroupCategory = async () => {
    // var authToken = await asyncStorage.getAuthToken();
    // console.log(authToken);
    try {
        const response = await axios.get(urlAPI+'/api/v1/category/get-category-group');
        //console.log('Get data : group category', response)
        return response.data;
    } catch (error) {
        console.error('Error fetching data - Get group category: ', error);
        console.log(error.response); // Thêm dòng này để xem chi tiết lỗi từ phản hồi của server

        throw error;
    }
};

export default getGroupCategory;
