import axios from "axios";
import { asyncStorage } from "../../utilies/asyncStorage";

const getGroupCategory = async () => {
    // var authToken = await asyncStorage.getAuthToken();
    // console.log(authToken);
    try {
        const response = await axios.get('https://project-pbl6-production.up.railway.app/api/v1/category/get-category-group', {
            // headers: {
            //     // 'Authorization': `Bearer ${authToken}`,
            //     'Content-Type': 'application/json',
            //     'accept': '*/*'
            // },
        });
        //console.log('Get data : group category', response)
        return response.data;
    } catch (error) {
        console.error('Error fetching data - Get group category: ', error);
        console.log(error.response); // Thêm dòng này để xem chi tiết lỗi từ phản hồi của server

        throw error;
    }
};

export default getGroupCategory;
