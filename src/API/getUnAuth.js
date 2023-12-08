import axios from "axios";
const getUnAuth=async (prop)=>{
    try {
        const response = await axios.get(`http://ec2-3-25-109-240.ap-southeast-2.compute.amazonaws.com:5555/api/v1/${prop}`)  
        return response.data
    } catch (error) {
        console.error('Error fetching data - Get group category: ', error);
        console.log('er',error.response); // Thêm dòng này để xem chi tiết lỗi từ phản hồi của server

        throw error;
    }
}
export default getUnAuth