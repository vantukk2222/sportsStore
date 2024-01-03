import axios from 'axios';
import { api } from '~/API/url';

const revenueAdmin = async (state, idBusiness, startDate, endDate) => {
    try {
        const response = await axios.get(api + 'bill/statistic', {
            params: {
                state: state,
                idBusiness: idBusiness,
                startDate: startDate,
                endDate: endDate,
            },
            headers: {
                // 'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });

        // console.log('call API get product ', response);
        return response.data;
    } catch (error) {
        //  console.error('Error fetching data: ', error);
        // console.log(error.response);
        throw error;
    }
};

export default revenueAdmin;
