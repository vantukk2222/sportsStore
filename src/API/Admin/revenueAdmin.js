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
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};

export default revenueAdmin;
