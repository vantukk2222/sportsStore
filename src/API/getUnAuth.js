import axios from "axios";
const getUnAuth=async (prop)=>{
    try {
        const response = await axios.get(`https://project-pbl6-production.up.railway.app/api/v1/${prop}`)  
        return response.data
    } catch (error) {
        console.error('Error fetching data - Get group category: ', error);
        console.log('er',error.response); // Thêm dòng này để xem chi tiết lỗi từ phản hồi của server

        throw error;
    }
}
export default getUnAuth