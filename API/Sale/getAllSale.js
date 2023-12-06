import axios from "axios";
const getAllSales = async (page, pageSize) => {
    try {
        const response = await axios.get('https://project-pbl6-production.up.railway.app/api/v1/sale', {
            params: {
                page: page,
                page_size: pageSize,
                sort: 'discount',
                desc: true
            },

        });

        // console.log('call API get product ', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching data getAllSale: ', error);
        // console.log(error.response);
        throw error;
    }
};

export default getAllSales;
