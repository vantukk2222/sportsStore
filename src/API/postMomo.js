import axios from 'axios';
import { api } from './url';

const postMomo = async (list_id, method_payment, authToken) => {
    try {
        const response = await axios.post(
            api + `cart/buy-with-momo?requestType=${method_payment}&redirectUrl=http://localhost:3000/`,
            list_id,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: ` Bearer ${authToken}`,
                },
            },
        );

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Thất bại', 'Thanh toán thất bại');
            throw new Error('Something went wrong!!!');
        }
    } catch (error) {
        console.error('Error:', error);
        console.error('Xin lỗi', 'Đã có lỗi xảy ra khi thanh toán bằng MOMO');
        throw new Error('Something went wrong with server!!!');
    }
};

export default postMomo;
