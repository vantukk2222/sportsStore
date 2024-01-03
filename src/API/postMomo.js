import axios from 'axios';
import { api } from './url';

const postMomo = async (list_id, method_payment, authToken) => {
    //console.log('payment MOMOAPI:', method_payment, list_id, authToken);
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

        //  console.log('link: ', response.data); // Log response data

        // Kiểm tra response và hiển thị thông báo phù hợp
        if (response.status === 200) {
            //   console.log('Thành công', 'Thanh toán thành công');
            return response.data;
        } else {
            console.log('Thất bại', 'Thanh toán thất bại');
            throw new Error('Something went wrong!!!');
        }
    } catch (error) {
        console.error('Error:', error);
        console.log('Xin lỗi', 'Đã có lỗi xảy ra khi thanh toán bằng MOMO');
        throw new Error('Something went wrong with server!!!');
    }
};

export default postMomo;
